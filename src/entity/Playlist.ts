import {Entity, BaseEntity,PrimaryGeneratedColumn, Column, ManyToOne} from "typeorm";
import {IsBoolean, IsDefined, IsNumber, IsOptional, IsString, MaxLength, isDecimal} from "class-validator"
import {Member} from "./Member";
@Entity()
export class Playlist extends BaseEntity{

    @PrimaryGeneratedColumn()
    playlist_id:string

    @ManyToOne(()=>Member,(m)=>m.playlists)
    member:Member

    @Column("varchar",{name:"playlist_name",nullable:true,unique:false})
    @IsOptional()
    @MaxLength(30)
    playlist_name:string;

    @Column("longtext",{name:"playlist_songs",nullable:false,unique:false})
    @IsDefined()
    playlist_songs:string;

}