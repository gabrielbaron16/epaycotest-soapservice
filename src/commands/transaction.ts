import { createTransaction, confirmTransaction, getTransaction } from "../dao/transaction";
import { getClient, discountTransaction } from "../dao/client";
import { ErrorHandler } from "../handlers/errorHandler";
import { sendEmail } from "../email/email";
import  crypto  from "crypto";

export const createTransactionCommand = async (object: any) => {
    try {
      const client = await getClient({document: object.document});
      if (!client)
        throw new ErrorHandler(404, "Cliente no Encontrado");
      if (client.phone != object.phone)  
        throw new ErrorHandler(404, "Los Teléfonos no Coinciden");
      if (object.value > client.balance)
        throw new ErrorHandler(400, "Valor de la Transacción Mayor al Balance");  
      const tok = crypto.pseudoRandomBytes(3).toString('hex');
      console.log(tok);
      const ses_id = crypto.pseudoRandomBytes(3).toString('hex');   
      const transaction = {
        client : client.id,
        value : object.value,
        token : tok,
        session_id : ses_id
      }     
      await createTransaction(transaction);
      await sendEmail(tok, client.email);
      return transaction.session_id;
    } catch (e) {
      throw e;
    }
};

export const confirmTransactionCommand = async (object: any) => {
    try {
      const transaction = await getTransaction(({token: object.token}));
      if (!transaction)
        throw new ErrorHandler(404, "Token no Encontrado");
      if (transaction.session_id != object.session_id)
        throw new ErrorHandler(404, "id de Sesión no Encontrado");
      await discountTransaction({id: transaction.client.id}, transaction.value);
      return await confirmTransaction({token: object.token});
    } catch (e) {
      throw e;
    }
};