import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { appConfig, dbConfig } from './config';
import { Category, UserModule, FoodModule, CategoryModule, User, Food } from './modules';
import { ServeStaticModule } from '@nestjs/serve-static';
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
  ],
  controllers: [],
  providers: [],
})

export class AppModule {}
