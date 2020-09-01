import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';
import { Client } from './db/entity/client';
import { Transaction } from './db/entity/transaction';


const typeOrmConfig: MysqlConnectionOptions = {
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "mysql",
    password: "mysql",
    database: "epayco",
    entities: [
        Client,
        Transaction
    ],
    synchronize: true,
    logging: false
};

export { typeOrmConfig };