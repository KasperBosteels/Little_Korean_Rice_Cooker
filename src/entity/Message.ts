import {Entity, BaseEntity,PrimaryColumn, Column, PrimaryGeneratedColumn, ManyToOne, OneToOne} from "typeorm";
import {IsBoolean, IsDefined, IsNumber, IsOptional, IsString, MaxLength, MinLength, isDecimal} from "class-validator"
import { Member } from "./Member";
import { Guild } from "./guild";

@Entity()
export class Message extends BaseEntity{

    @PrimaryGeneratedColumn()
    message_id:number


    @ManyToOne(()=>Member,(m)=>m.messages)
    member:Member

    @ManyToOne(()=>Guild,(g)=>g.messages)
    guild:Guild

    @Column("varchar",{name:"channel_id", nullable:false,unique:false})
    channel_id:string

    @Column("varchar",{name:"channel_name",nullable:false,unique:false})
    channel_name:string

    @Column("longtext",{name:"message",nullable:false})
    @MinLength(1)
    @MaxLength(600)
    message:string

}