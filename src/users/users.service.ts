import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeepPartial } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { loginAuthDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interfaces/jwtPayload';
import { UserRole } from 'src/users/entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async create(
    createUserDto: CreateUserDto,
  ): Promise<{ user: User; token: string }> {
    try {
      const existingUser = await this.userRepository.findOne({
        where: { email: createUserDto.email },
      });
      if (existingUser) {
        throw new BadRequestException('Email already registered');
      }

      if (
        !createUserDto.password ||
        typeof createUserDto.password !== 'string'
      ) {
        throw new BadRequestException(
          'Password is required and must be a string',
        );
      }

      const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

      // Crear manualmente un objeto User en lugar de usar `this.userRepository.create()`
      const newUser = new User();
      newUser.name = createUserDto.name;
      newUser.email = createUserDto.email;
      newUser.password = hashedPassword;
      newUser.role = Object.values(UserRole).includes(createUserDto.role)
        ? createUserDto.role
        : UserRole.CLIENT;
      newUser.purchase_history = createUserDto.purchase_history
        ? createUserDto.purchase_history.map((purchase) => ({
            productId: purchase.productId,
            date: purchase.purchaseDate.toISOString(),
            quantity: purchase.amount,
          }))
        : [];

      await this.userRepository.save(newUser);
      const { email, role } = newUser;
      const payload: JwtPayload = { email, role };
      const token = this.getJwtToken(payload);
      return { user: newUser, token };
    } catch (error: unknown) {
      console.error(
        'Error creating user:',
        error instanceof Error ? error.message : error,
      );
      throw new BadRequestException(
        error instanceof Error ? error.message : 'Failed to create user',
      );
    }
  }

  private getJwtToken(payload: JwtPayload) {
    return this.jwtService.sign(payload);
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.preload({
      id,
      ...(updateUserDto as DeepPartial<User>),
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    await this.userRepository.save(user);
    return user;
  }

  async remove(id: string): Promise<void> {
    await this.findOne(id);
    await this.userRepository.delete({ id });
  }

  async login(loginDto: loginAuthDto) {
    try {
      const { email, password } = loginDto;
      const user = await this.userRepository.findOneBy({ email });

      if (!user || !user.password) {
        throw new UnauthorizedException('Invalid credentials');
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        throw new UnauthorizedException('Invalid password');
      }

      const { role } = user;
      const payload: JwtPayload = { email, role };
      const token = this.getJwtToken(payload);

      return { user, token };
    } catch (error: unknown) {
      console.error('Error during login:', error);
      throw new UnauthorizedException('Invalid credentials');
    }
  }
}
