import { createClient, rechargeWallet, getClient } from "../dao/client";
import { ErrorHandler } from "../handlers/errorHandler";
export const createClientCommand = async (client: any) => {
    try {
      return await createClient(client);
    } catch (e) {
      throw e;
    }
};

export const rechargeWalletCommand = async (object: any) => {
    try {
      const client = await rechargeWallet(object);
      return client.balance;
    } catch (e) {
      throw e;
    }
};

export const getBalanceCommand = async (object: any) => {
    try {
      const client = await getClient({document: object.document});
      if (!client)
        throw new ErrorHandler(404, "Cliente no Encontrado");
      if (client.phone != object.phone)  
        throw new ErrorHandler(404, "Los Teléfonos no Coinciden");
      return client.balance;  
    } catch (e) {
      throw e;
    }
};