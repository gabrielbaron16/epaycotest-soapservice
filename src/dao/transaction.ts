import { getManager } from 'typeorm';
import Transaction from '../entity/transaction';
import { ErrorHandler } from '../handlers/errorHandler';

export const getTransaction = async (criteria: any) => {
    try {
        const transactionRepository = getManager().getRepository(Transaction);
        return await transactionRepository.findOne({
            relations : ['client'],
            where: criteria});
    } catch (error){
        console.log(error.message);
        throw new ErrorHandler(500, `${error.name} ${error.message}`);
    }
}

export const createTransaction = async (transaction: any) => {
    try {
        const transactionRepository = getManager().getRepository(Transaction);
        await transactionRepository.save(transaction);
        return transaction;
    } catch (error){
        throw new ErrorHandler(500, `${error.name} ${error.message}`);
    }    
}

export const confirmTransaction = async (criteria: any) => {
    try {
        const transactionRepository = getManager().getRepository(Transaction);
        let transaction = await transactionRepository.findOne({
        where: criteria});
        transaction.token = null;
        transaction.session_id = null;
        await transactionRepository.save(transaction);
        return transaction;
    } catch (error){
        console.log(error.message);
        throw new ErrorHandler(500, `${error.name} ${error.message}`);
    }        
}