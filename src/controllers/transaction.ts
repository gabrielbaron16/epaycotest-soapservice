import { createTransactionCommand, confirmTransactionCommand } from "../commands/transaction";
import { ErrorHandler } from "../handlers/errorHandler";
import { app } from "../constants/appVariable";

export const TransactionController = {
  Transaction_Service: {
    Transaction_Port: {
      createTransaction: async function (args: any, cb: any) {
        try {
          const object = {
            document: args.document.$value,
            phone: args.phone.$value,
            value: args.value.$value
          };
          const auth_token = args.auth_token.$value;
          if (auth_token != app.auth_token)
            throw new ErrorHandler(401, "No está Autorizado");
          const session_id = await createTransactionCommand(object);
          return {
            session_id,
            message: "El Token para Realizar la Confirmación se Envió al Correo",
          };
        } catch (error) {
          cb({
            Fault: {
              error: error.message,
              statusCode: error.statusCode ? error.statusCode : 500,
            },
          });
        }
      },
      confirmTransaction: async function (args: any, cb: any) {
        const object = {
            session_id: args.session_id.$value,
            token: args.token.$value
        };  
        try {
          const auth_token = args.auth_token.$value;
          if (auth_token != app.auth_token)
            throw new ErrorHandler(401, "No está Autorizado");
          await confirmTransactionCommand(object);
          return {
            message: "Transacción Confirmada",
          };
        } catch (error) {
          cb({
            Fault: {
              error: error.message,
              statusCode: error.statusCode ? error.statusCode : 500,
            },
          });
        }
      },
    },
  },
};
