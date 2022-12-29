

import {Entity, BaseEntity,PrimaryColumn, Column, OneToMany, OneToOne} from "typeorm";
import {IsBoolean, IsDefined, IsOptional, MaxLength, MinLength,} from "class-validator"
import { Message } from "./Message";
import { Warning } from "./Warning";
import { Custom_Swear } from "./Custom_Swears";

@Entity()
export class Guild extends BaseEntity{

    public static createGuild =(
            guildID:string,
            level_system:boolean=false,
            log_channel:string,
            prefix:string="-",
            profanity:boolean=false,
            profanity_channel:string,
            welcome:boolean=false,
            welcome_channel:string)=>{
        const g = new Guild();
        g.guild_id=guildID
        g.level_system=level_system
        g.log_channel=log_channel
        g.guild_prefix=prefix
        if(profanity){
            g.guild_profanity=profanity
            g.profanity_channel=profanity_channel
        }
        if(welcome){
            g.welcome=welcome
            g.welcome_channel=welcome_channel
        }
        Guild.save(g);
    }


    @PrimaryColumn("varchar",{name:"guild_id",nullable:false,unique:true})
    @IsDefined()
    guild_id:string

    @Column("varchar",{name:"guild_name",nullable:true,unique:false})
    @IsDefined()
    guild_name:string

    @Column("boolean",{name:"level_system",nullable:false,unique:false, default:false})
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

    @Column ("boolean", {name:"welcome",nullable:true,default:false})
    @IsBoolean()
    @IsOptional()
    welcome:boolean

    @Column("varchar",{name:"welcome_channel",nullable:true,default:null,unique:false})
    @IsOptional()
    welcome_channel:string

    @Column("text",{name:"welcome_message",nullable:true,default:"**welcome** ${name} joined us.",unique:false})
    @IsOptional()
    welcome_message:string

    @Column("text",{name:"leave_message",nullable:true,default:"**oh no**\n ${name} left.",unique:false})
    @IsOptional()
    leave_message:string

    @OneToMany(()=>Message,(m)=>m.guild,{nullable:true})
    @IsOptional()
    messages:Message[]

    @OneToMany(()=>Warning,(w)=>w.guild,{nullable:true})
    @IsOptional()
    warnings:Warning[]

    @OneToOne(()=>Custom_Swear,(c)=>c.guild,{nullable:true,cascade:true})
    @IsOptional()
    custom_swearlist:Custom_Swear

}