import {Entity, BaseEntity,PrimaryColumn, Column} from "typeorm";
import {IsBoolean, IsDefined, IsNumber, IsOptional, IsString, isDecimal} from "class-validator"

@Entity()
export class Profanity extends BaseEntity{

    @PrimaryColumn("varchar",{name:"user_id",nullable:false,unique:true})
    @IsDefined()
    user_id:string

    @Column("smallint",{name:"amount",nullable:true,unique:false,})
    amount:number
    


}