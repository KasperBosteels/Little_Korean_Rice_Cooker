import {Entity, BaseEntity,PrimaryColumn, Column, PrimaryGeneratedColumn, OneToOne} from "typeorm";
import {IsBoolean, IsDefined, IsNumber, IsOptional, IsString, isDecimal} from "class-validator"
import { Guild } from "./guild";

@Entity()
export class Custom_Swear extends BaseEntity{


@PrimaryGeneratedColumn()
list_id:number

@OneToOne(()=>Guild,(g)=>g.custom_swearlist)
guild:Guild

@Column("longtext",{name:"swear_list",nullable:true,unique:false})
swear_list:string

}