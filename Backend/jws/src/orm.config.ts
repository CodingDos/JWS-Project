import { DataSource, DataSourceOptions } from 'typeorm';
import databaseConfig from '../configs/database.config';

const dbConfig = databaseConfig();

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: dbConfig.host,
  port: dbConfig.port,
  username: dbConfig.username,
  password: dbConfig.password,
  database: dbConfig.database,
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/migrations/*{.ts,.js}'],
  synchronize: dbConfig.synchronize,
  logging: dbConfig.logging,
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
