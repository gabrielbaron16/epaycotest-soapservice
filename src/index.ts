import {createConnection} from "typeorm";
import { typeOrmConfig } from './database';
import express from "express";
import {soap} from 'express-soap';
import { ClientXml } from './wsdl/client';
import { TransactionXml } from './wsdl/transaction';
import { ClientController } from './controllers/client';
import { TransactionController } from './controllers/transaction'

const app = express();
app.use("/soap/client", soap({services:ClientController,wsdl:ClientXml}));
app.use("/soap/transaction", soap({services:TransactionController,wsdl:TransactionXml}));

//configure application routes
//@GET - dummy api route
//@ts-ignore
app.get('/api', (req, res, next) => {
  res.status(200).json({
    hello: 'World!',
  });
});

const port: Number = Number(process.env.PORT) || 3000;
const startServer = async () => {
  await app.listen(port, () => {
    console.log(`
Server running on http://localhost:${port}
`);
  });
};

createConnection(typeOrmConfig).then(async _connection => {
    startServer();
  }).catch((error) => console.log(error));