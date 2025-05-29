import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { loginAuthDto } from 'src/users/dto/login.dto';
import { RegisterAuthDto } from 'src/users/dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async register(registerAuthDto: RegisterAuthDto) {
    try {
      if (
        !registerAuthDto.password ||
        typeof registerAuthDto.password !== 'string'
      ) {
        throw new BadRequestException('Invalid password format');
      }

      const hashedPassword = await (
        bcrypt.hash as (
          data: string,
          saltOrRounds: string | number,
        ) => Promise<string>
      )(registerAuthDto.password, 10);

      const user = this.userRepository.create({
        ...registerAuthDto,
        password: hashedPassword,
      });

      await this.userRepository.save(user);
      const { email, name: fullName } = user;
      return { email, fullName };
    } catch (error: unknown) {
      console.error('Error during registration:', error);
      throw new BadRequestException(
        error instanceof Error ? error.message : 'Error during registration',
      );
    }
  }

  async getProfile(id: string) {
    try {
      const user = await this.userRepository.findOne({ where: { id } });
      if (!user) {
        throw new NotFoundException('User not found');
      }
      return user;
    } catch (error: unknown) {
      console.error('Error fetching profile:', error);
      throw new BadRequestException('Error fetching profile');
    }
  }

  async login(loginUser: loginAuthDto) {
    try {
      const { email, password } = loginUser;

      if (
        !email ||
        !password ||
        typeof email !== 'string' ||
        typeof password !== 'string'
      ) {
        throw new BadRequestException('Invalid credentials format');
      }

      const user = await this.userRepository.findOne({ where: { email } });

      if (!user || !user.password) {
        throw new UnauthorizedException('User or password incorrect');
      }

      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) {
        throw new UnauthorizedException('User or password incorrect');
      }

      return user;
    } catch (error: unknown) {
      console.error('Error during login:', error);
      throw new BadRequestException('Invalid credentials');
    }
  }
}
