import { ObjectType, Field, Int } from "@nestjs/graphql";
import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from "typeorm";

@ObjectType()
@Entity()
export class User {
  @Field(() => Int,{nullable: true})
  @PrimaryGeneratedColumn()
  id: number;

  @Field({nullable: true})
  @Column()
  email: string;

  @Field({nullable: true})
  @Column()
  password: string;

  @Field({nullable: true})
  @CreateDateColumn()
  createdAt: Date;

  @Field({nullable: true})
  @UpdateDateColumn()
  updatedAt: Date;

  @Field({nullable: true})
  @DeleteDateColumn()
  deletedAt: Date;

}