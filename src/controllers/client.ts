import { createClientCommand, rechargeWalletCommand, getBalanceCommand } from '../commands/client';
import { ErrorHandler } from '../handlers/errorHandler';
import { application } from '../constants/appVariable';
export const ClientController = {
  Client_Service: {
    Client_Port: {
      createClient: async function (args : any , cb : any) {
        try {
          const auth_token = args.auth_token.$value;
          if(auth_token != application.auth_token) throw new ErrorHandler(401, 'No Está Autorizado');
          const client  = {
            document: args.document.$value,
            name : args.name.$value,
            lastName : args.lastName.$value,
            email : args.email.$value,
            phone : args.phone.$value,
            balance : null,
          };
          client.balance = 0;
          const data = await createClientCommand(client);
          return {
            Cliente: {
              id: data.id,
              document: data.document,
              name: data.name,
              lastName: data.lastName,
              email : data.email,
              phone : data.phone,
              balance : data.balance
            },
            message: "Cliente"
          }      
        } catch (error) {
          cb({
            Fault: {
              error: error.message ,
              statusCode: error.statusCode? error.statusCode : 500
            }
          })
        }
      },
      rechargeWallet : async function (args:any,cb:any){
        try {
          const object = {
            document: args.document.$value,
            phone : args.phone.$value,
            value : args.value.$value
          };
          const auth_token = args.auth_token.$value;
          if(auth_token != application.auth_token) throw new ErrorHandler(401, 'No Está Autorizado');
          const data = await rechargeWalletCommand(object);
          return {
            balance: data,
            message: "Se Recargó la Cartera Correctamente"
          }  
        } catch (error) {
          cb({
            Fault: {
              error: error.message ,
              statusCode: error.statusCode? error.statusCode : 500
            }
          })
        }
      },
      getBalance: async function ( args:any, cb:any){
        const object = {
          document: args.document.$value,
          phone : args.phone.$value
        }
        try {
          const auth_token = args.auth_token.$value;
          if(auth_token != application.auth_token) throw new ErrorHandler(401, 'No Está Autorizado');
          const data = await getBalanceCommand(object);
          return {
            balance: data,
            message: "Se Obtuvo el Balance Satisfactoriamente"
          }  
        } catch (error) {
          cb({
            Fault: {
              error: error.message ,
              statusCode: error.statusCode? error.statusCode : 500
            }
          })
        }
      }
    },
  },
};
