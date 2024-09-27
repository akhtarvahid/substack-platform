import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";

const config: PostgresConnectionOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5454,
    username: 'substack',
    password: 'password',
    database: 'substack',
    entities: [__dirname + '/**/*.entity{.ts,.js}'], // path for all the entities
    synchronize: false, // make it true only in dev environment not in prod environment
    migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
}
export default config;