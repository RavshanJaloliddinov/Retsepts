import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginResponse, RefreshResponse, RegisterResponse } from './interfaces';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoginDto, RefreshDto, RegisterDto } from './dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  #_service: AuthService;

  constructor(service: AuthService) {
    this.#_service = service;
  }
  @ApiOperation({ summary: 'Login qilish' })
  @Post('/login')
  async signIn(@Body() payload: LoginDto): Promise<LoginResponse> {
    return await this.#_service.login(payload);
  }

  @ApiOperation({ summary: 'Register qilish' })
  @Post('/register')
  async signUp(@Body() payload: RegisterDto): Promise<RegisterResponse> {
    return await this.#_service.register(payload);
  }

  @ApiOperation({ summary: 'Refresh tokenni yangilash' })
  @Post('/refresh')
  async refresh(@Body() payload: RefreshDto): Promise<RefreshResponse> {
    return await this.#_service.refresh(payload);
  }
}