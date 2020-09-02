import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from "typeorm";
import Client from "./client";

@Entity()
export class Transaction {

    @PrimaryGeneratedColumn()
        id: Number;

    @Column( {unique: true, nullable: true})
        token: string;
    
    @Column( {unique: true, nullable: true})
        session_id: string;
        
    @Column()
        value: Number;    

    @ManyToOne(_type => Client,{ nullable: true, onDelete: 'CASCADE' })
        client: Client;
};

export default Transaction;       