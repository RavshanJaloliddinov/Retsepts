import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CategoryModule } from './modules';
import { appConfig, dbConfig } from './config';
import { Category } from './modules';
import { UserModule } from './modules/user/user.module';
@Module({
  imports: [
    CategoryModule,
    ConfigModule.forRoot({
      isGlobal: true, 
      load: [appConfig, dbConfig]
    }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        try {
          return{
            dialect: 'postgres',
            host: config.get("database.host"),
            port: config.get<number>("database.port"),
            username: config.get('database.user'),
            password: config.get('database.password'),
            database: config.get('database.dbName'),
            models: [Category],
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
    UserModule
  ],
  controllers: [],
  providers: [],
})

export class AppModule {}
