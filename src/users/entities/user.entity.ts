import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ default: true })
    email: string;

    @Column({ default: true })
    password: string;

    @Column()
    name: string;

    @Column()
    phone: string;

    @Column()
    age: number;

    @Column()
    address: string;

    @CreateDateColumn({ type: "timestamp" })
    createdAt: Date;

    @UpdateDateColumn({ type: "timestamp" })
    updatedAt: Date;

}
