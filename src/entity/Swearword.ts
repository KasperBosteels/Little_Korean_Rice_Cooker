import {Entity, BaseEntity,PrimaryColumn, Column} from "typeorm";
import {IsBoolean, IsDefined, IsNumber, IsOptional, IsString, isDecimal} from "class-validator"

@Entity()
export class Swearword extends BaseEntity{

   @PrimaryColumn("varchar",{name:"word",length:50})
   word:string;



}