// import { TypeOrmModuleAsyncOptions, TypeOrmModuleOptions } from "@nestjs/typeorm";
// import { ConfigService, ConfigModule } from "@nestjs/config";

// export const typeOrmConfig: TypeOrmModuleAsyncOptions = {
//   imports: [ConfigModule],
//   useFactory: async (configService: ConfigService): Promise<TypeOrmModuleOptions> => {
//     return {
//       type: 'postgres',
//       host: configService.get<string>('DB_HOST'),
//       port: configService.get<number>('DB_PORT'),
//       username: configService.get<string>('DB_USERNAME'),
//       password: configService.get<string>('DB_PASSWORD'),
//       database: configService.get<string>('DB_NAME'),
//       entities: ['src/**/*.entity{.ts,.js}'],
//       migrations: ['src/migrations/*{.ts,.js}'],
//       migrationsRun: false,
//       synchronize: false,
//       logging: true,
//     }
//   },
//   inject: [ConfigService],
// };  

import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';

config();

const configService = new ConfigService();

export default new DataSource({
  type: 'postgres',
  host: configService.get('DB_HOST'),
  port: configService.get('DB_PORT'),
  username: configService.get('DB_USERNAME'),
  password: configService.get('DB_PASSWORD'),
  database: configService.get('DB_NAME'),
  entities: [`${__dirname}/../src/**/*.entity{.ts,.js}`],
  synchronize: false,
  logging: true,
  migrations: [`${__dirname}/migrations/*{.ts,.js}`],
  migrationsTableName: 'migrations',
});
