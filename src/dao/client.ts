import { getManager } from 'typeorm';
import Client from '../entity/client';
import { ErrorHandler } from '../handlers/errorHandler';

export const getClient = async (criteria: any) => {
    try {
        const clientRepository = getManager().getRepository(Client);
        return await clientRepository.findOne({
        where: criteria});
    } catch (error){
        throw new ErrorHandler(500, `${error.name} ${error.message}`);
    }    
}

export const createClient = async (client: any) => {
    try {
        const clientRepository = getManager().getRepository(Client);
        await clientRepository.save(client);
        return client;
    } catch (error){
        throw new ErrorHandler(500, `${error.name} ${error.message}`);
    }    
}

export const rechargeWallet = async (criteria: any, object: any) => {
    try {
        const clientRepository = getManager().getRepository(Client);
        let client = await clientRepository.findOne({
        where: criteria}); 
        if (client.phone != object.phone)  
            throw new ErrorHandler(404, "Los Teléfonos no Coinciden");
        client.balance = + client.balance + Number(object.value);
        await clientRepository.save(client);
        return client;
    } catch (error){
        console.log(error.message);
        throw new ErrorHandler(500, `${error.name} ${error.message}`);
    }    
}

export const discountTransaction = async (criteria: any, value: any) => {
    try {
        const clientRepository = getManager().getRepository(Client);
        let client = await clientRepository.findOne({
            where: criteria});
        if (client.balance >= value)
            client.balance = + client.balance - Number(value);
        else
            throw new ErrorHandler(400, `Valor de la Transacción Mayor al Balance`);   
        await clientRepository.save(client);
        return client;
    } catch (error){
        console.log('Hola');
        console.log(error.message);
        throw new ErrorHandler(500, `${error.name} ${error.message}`);
    }    
}