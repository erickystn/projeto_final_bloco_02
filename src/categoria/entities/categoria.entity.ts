import { Transform, Type } from "class-transformer";
import { IsNotEmpty, Length } from "class-validator";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Produto } from "../../produto/entities/produto.entity";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";


@Entity({ name: 'tb_categorias' })
export class Categoria {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column({ length: 60, nullable: false })
  @Length(4, 60, { message: 'Nome categoria deve ter entre 4 a 60 caracteres' })
  @IsNotEmpty({ message: 'Nome é obrigatório' })
  @Transform((param) => param.value.trim())
  @ApiProperty()
  nome: string;

  @OneToMany(() => Produto, (produto) => produto.categoria)
  @Type(()=>Produto)
  @ApiPropertyOptional({ type: () => Produto, isArray:true })
  produtos: Produto[];
}
