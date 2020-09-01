import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class Client {

    @PrimaryGeneratedColumn()
    id: Number;

    @Column({
        unique: true
    })
    document: string;

    @Column({
        unique: true
    })
    email: string;

    @Column()
    name: string;

    @Column()
    last_name: string;

    @Column()
    phone: string;

    @Column()
    balance: Number;
};

export default Client;