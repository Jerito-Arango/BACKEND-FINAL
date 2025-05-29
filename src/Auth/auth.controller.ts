import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { AuthService } from 'src/Auth/auth.service';
import { loginAuthDto } from 'src/users/dto/login.dto';
import { RegisterAuthDto } from 'src/users/dto/register.dto';
import { JwtAuthGuard } from 'src/Auth/JwtStrategy';
import { RolesGuard } from 'src/common/Guards/RolesGuard';
import { UserRole } from 'src/users/entities/user.entity';
import { Roles } from 'src/common/decorators/roles.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() registerAuthDto: RegisterAuthDto) {
    return this.authService.register(registerAuthDto);
  }

  @Post('login')
  login(@Body() loginAuthDto: loginAuthDto) {
    return this.authService.login(loginAuthDto);
  }

  @Post('profile')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.CLIENT)
  profile(@Body('id') id: string) {
    return this.authService.getProfile(id);
  }
}
