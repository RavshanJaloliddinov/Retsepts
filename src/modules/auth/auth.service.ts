import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnprocessableEntityException
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ConfigService } from '@nestjs/config';
import { JsonWebTokenError, JwtService, NotBeforeError, TokenExpiredError } from '@nestjs/jwt';
import { User } from '../user';
import { LoginRequest, LoginResponse, RefreshRequest, RefreshResponse, RegisterRequest, RegisterResponse } from './interfaces';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User) private usermodel: typeof User,
    private config: ConfigService,
    private jwt: JwtService,
  ) { }

  async login(payload: LoginRequest): Promise<LoginResponse> {
    const foundedUser = await this.usermodel.findOne({
      where: { email: payload.email, password: payload.password },
    });

    if (!foundedUser) {
      throw new NotFoundException('User not found');
    }

    const accessToken = await this.jwt.signAsync(
      {
        id: foundedUser.id,
        role: foundedUser.role,
      },
      {
        expiresIn: this.config.get<number>('ACCESS_TOKEN_EXPIRE_TIME'),
        secret: this.config.get<string>('ACCESS_TOKEN_SECRET_KEY'),
      }
    );

    const refreshToken = await this.jwt.signAsync(
      {
        id: foundedUser.id,
        role: foundedUser.role,
      },
      {
        expiresIn: this.config.get<number>('REFRESH_TOKEN_EXPIRE_TIME'),
        secret: this.config.get<string>('REFRESH_TOKEN_SECRET_KEY'),
      },
    );

    return {
      message: 'successfully logged in',
      accessToken,
      refreshToken,
    };
  }

  async register(payload: RegisterRequest): Promise<RegisterResponse> {
    const newUser = await this.usermodel.create(
      {
        fullName: payload.fullName,
        email: payload.email,
        password: payload.password
      });

    const accessToken = await this.jwt.signAsync(
      {
        id: newUser.id,
        role: newUser.role,
      },
      {
        expiresIn: this.config.get<number>('ACCESS_TOKEN_EXPIRE_TIME'),
        secret: this.config.get<string>('ACCESS_TOKEN_SECRET_KEY'),
      },
    );

    const refreshToken = await this.jwt.signAsync(
      {
        id: newUser.id,
        role: newUser.role,
      },
      {
        expiresIn: this.config.get<number>('REFRESH_TOKEN_EXPIRE_TIME'),
        secret: this.config.get<string>('REFRESH_TOKEN_SECRET_KEY'),
      },
    );

    return {
      message: 'successfully registered in',
      accessToken,
      refreshToken,
    };
  }

  async logout() { }

  async refresh(payload: RefreshRequest): Promise<RefreshResponse> {
    try {
      this.jwt.verify(payload.refreshToken, { secret: this.config.get<string>('REFRESH_TOKEN_SECRET_KEY') });
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        throw new UnprocessableEntityException("Token already expired");
      }

      if (error instanceof NotBeforeError) {
        throw new ConflictException("Token not before error");
      }

      if (error instanceof JsonWebTokenError) {
        throw new BadRequestException(error.message);
      }

      throw new InternalServerErrorException("Internal error occurred");
    }

    const userDecodedData = this.jwt.decode(payload.refreshToken);

    const accessToken = await this.jwt.signAsync(
      {
        id: userDecodedData?.id,
        role: userDecodedData?.role,
      },
      {
        expiresIn: this.config.get<number>('ACCESS_TOKEN_EXPIRE_TIME'),
        secret: this.config.get<string>('ACCESS_TOKEN_SECRET_KEY'),
      },
    );

    const refreshToken = await this.jwt.signAsync(
      {
        id: userDecodedData?.id,
        role: userDecodedData?.role,
      },
      {
        expiresIn: this.config.get<number>('REFRESH_TOKEN_EXPIRE_TIME'),
        secret: this.config.get<string>('REFRESH_TOKEN_SECRET_KEY'),
      },
    );

    return {
      message: 'successfully refreshed',
      accessToken,
      refreshToken,
    };
  }
}