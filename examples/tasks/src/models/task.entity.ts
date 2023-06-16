import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Task {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: "varchar",
        length: 100
    })
    title: string;
    
    @Column({
        type: "text",
        length: 4000
    })
    description: string;

    @Column({
        type: "varchar",
        length: 100
    })
    userId: string;

    @Column({
            type: "boolean",
            default: false
    })
    completed: boolean;

    @Column({
        type: "datetime",
        default: () => "CURRENT_TIMESTAMP"
    })
    createdAt: Date;

    @Column({
        type: "datetime",
        default: () => "CURRENT_TIMESTAMP"
    })
    updatedAt: Date;
}