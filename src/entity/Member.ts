import {Entity, BaseEntity,PrimaryColumn, Column} from "typeorm";
import {IsBoolean, IsDefined, IsNumber, IsOptional, IsString, isDecimal} from "class-validator"

@Entity()
export class Member extends BaseEntity{

    @PrimaryColumn("varchar",{name:"user_id",nullable:false,unique:true})
    @IsDefined()
    user_id:string

    @Column("varchar",{name:"user_name",nullable:false,unique:false})
    @IsDefined()
    user_name:string

    @Column("numeric",{name:"user_level",nullable:false,unique:false})
    @IsNumber()
    user_level:number

    @Column("boolean",{nullable:true,name:"is_ignored"})
    @IsBoolean()
    @IsOptional()
    is_ignored:boolean

    @Column("numeric",{name:"user_experience",nullable:false, default:0,unique:false})
    @IsNumber()
    @IsOptional()
    user_experience:number



}