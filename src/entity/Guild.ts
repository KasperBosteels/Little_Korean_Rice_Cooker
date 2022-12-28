

import {Entity, BaseEntity,PrimaryColumn, Column, OneToMany} from "typeorm";
import {IsBoolean, IsDefined, IsOptional, MaxLength, MinLength,} from "class-validator"
import { Message } from "./Message";
import { Warning } from "./Warning";

@Entity()
export class Guild extends BaseEntity{

    @PrimaryColumn("varchar",{name:"guild_id",nullable:false,unique:true})
    @IsDefined()
    guild_id:string

    @Column("varchar",{name:"guild_name",nullable:false,unique:false})
    @IsDefined()
    guild_name:string

    @Column("boolean",{name:"level_system",nullable:false,unique:false, default:0})
    @IsBoolean()
    level_system:boolean
    
    @Column("varchar",{name:"log_channel",nullable:true,unique:false,default:null})
    @IsOptional()
    log_channel:string

    @Column("varchar",{name:"guild_prefix",nullable:true,unique:false,default:"-"})
    @IsOptional()
    @MaxLength(5)
    @MinLength(1)
    guild_prefix:string

    @Column("boolean",{name:"guild_profanity",nullable:true,default:0})
    @IsOptional()
    @IsBoolean()
    guild_profanity:boolean

    @Column("varchar",{name:"profanity_channel",nullable:true,default:null,unique:false})
    @IsOptional()
    profanity_channel:string

    @Column("boolean",{name:"guild_chatbot", nullable:true,default:0})
    @IsOptional()
    @IsBoolean()
    guild_chatbot:boolean

    @Column("varchar",{name:"welcome_channel",nullable:true,default:null,unique:false})
    @IsOptional()
    welcome_channel:string

    @Column("text",{name:"welcome_message",nullable:true,default:null,unique:false})
    @IsOptional()
    welcome_message:string

    @Column("text",{name:"leave_message",nullable:true,default:null,unique:false})
    @IsOptional()
    leave_message:string

    @OneToMany(()=>Message,(m)=>m.guild,{nullable:true})
    @IsOptional()
    messages:Message[]

    @OneToMany(()=>Warning,(w)=>w.guild,{nullable:true})
    @IsOptional()
    warnings:Warning[]

}