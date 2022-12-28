import {Entity, BaseEntity,PrimaryColumn, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany} from "typeorm";
import {IsBoolean, IsDefined, IsNumber, IsOptional, IsString, isDecimal} from "class-validator"
import { Guild } from "./guild";
import { Member } from "./Member";

@Entity()
export class Warning extends BaseEntity{

   
    @PrimaryGeneratedColumn()
    warning_id:number

    @ManyToOne(()=>Guild,(g)=>g.warnings,{nullable:false})
    @IsDefined()
    guild:Guild

    @ManyToOne(()=>Member,(m)=>m.warnings,{nullable:false})
    @IsDefined()
    member:Member

    @Column("varchar",{name:"warning_message",nullable:false,unique:false})
    @IsDefined()
    warning_message:string

}