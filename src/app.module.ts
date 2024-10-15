import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { appConfig, dbConfig } from './config';
import { Category, UserModule, FoodModule, CategoryModule, User, Food } from './modules';
import { ServeStaticModule } from '@nestjs/serve-static';
import { UploadModule } from './modules/upload/upload.module';
import { CheckAuthGuard } from './guards';
import { APP_GUARD } from '@nestjs/core';
import { AuthModule } from './modules/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
@Module({
  imports: [
    CategoryModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, dbConfig]
    }),
    ServeStaticModule.forRoot({
      serveRoot: "/uploads",
      rootPath: "uploads"
    }),
    JwtModule.register({
      secret: 'my secret',
      global: true,
      signOptions: {
        expiresIn: 60 * 15
      }
    }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        try {
          return {
            dialect: 'postgres',
            host: config.get("database.host"),
            port: config.get<number>("database.port"),
            username: config.get('database.user'),
            password: config.get('database.password'),
            database: config.get('database.dbName'),
            models: [Category, User, Food],
            synchronize: true,
            // sync: {force: true},
            logging: console.log,
            autoLoadModels: true,
          }
        } catch (error) {
          console.log(error)
        }
      }
    }),
    CategoryModule,
    UserModule,
    FoodModule,
    UploadModule,
    AuthModule,
  ],
  controllers: [],
  providers: [
    {
      useClass: CheckAuthGuard,
      provide: APP_GUARD
    }
  ],
})

export class AppModule { }
