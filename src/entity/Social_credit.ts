import {Entity, BaseEntity,PrimaryColumn, Column, PrimaryGeneratedColumn, OneToOne} from "typeorm";
import { IsDefined, IsNumber} from "class-validator"
import { Member } from "./Member";

@Entity()
export class Social_credit extends BaseEntity{

    @PrimaryGeneratedColumn()
    score_id:number

    
    @OneToOne(()=>Member,(m)=>m.score)
    member:Member



    @Column("numeric",{name:"social_score",nullable:false,default:10_000})
    @IsDefined()
    @IsNumber()
    social_score:number



}