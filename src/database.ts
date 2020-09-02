import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';
import { Client } from './entity/client';
import { Transaction } from './entity/transaction';
import { db } from './constants/dbVariables';


const typeOrmConfig: MysqlConnectionOptions = {
    type: "mysql",
    host: db.host,
    port: 3306,
    username: db.username,
    password: db.password,
    database: db.database,
    entities: [
        Client,
        Transaction
    ],
    synchronize: true,
    logging: false
};

export { typeOrmConfig };