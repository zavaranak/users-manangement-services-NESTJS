// import { Module } from '@nestjs/common';
// import { ConfigModule } from '@nestjs/config';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { UserModule } from './users/users.module';
// import { ActionsRecordModule } from './actions-record/actions-record.module';
// import { typeOrmConfig } from 'typeorm.config';

// @Module({
//   imports: [
//     ConfigModule.forRoot(), // Load environment variables from .env
//     TypeOrmModule.forRootAsync(typeOrmConfig),
//     UserModule,
//     ActionsRecordModule,
//   ],
// })
// export class AppModule { }


import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppConfig, DatabaseConfig } from './config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './users/users.module';
import { ActionsRecordModule } from './actions-record/actions-record.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [AppConfig, DatabaseConfig],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        ...configService.get('database'),
      }),
      inject: [ConfigService],
    }),
    UserModule, ActionsRecordModule
  ],
})
export class AppModule { }