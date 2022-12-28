import {Entity, BaseEntity,PrimaryColumn, Column, OneToMany, OneToOne} from "typeorm";
import {IsBoolean, IsDefined, IsNumber, IsOptional} from "class-validator"
import { Playlist } from "./Playlist";
import { Message } from "./Message";
import { Warning } from "./Warning";
import { Social_credit } from "./Social_credit";

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

    @OneToMany(()=>Playlist,(p)=>p.member,{nullable:true,cascade:true})
    @IsOptional()
    playlists:Playlist[]

    @OneToMany(()=>Message,(m)=>m.member,{nullable:true})
    @IsOptional()
    messages:Message[]

    @OneToMany(()=>Warning,(w)=>w.member,{nullable:true})
    @IsOptional()
    warnings:Warning[]

    @OneToOne(()=>Social_credit,(s)=>s.member,{cascade:true})
    score:Social_credit
}