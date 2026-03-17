import { Transform } from "class-transformer";
import { IsNotEmpty, Length } from "class-validator";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Produto } from "../../produto/entities/produto.entity";


@Entity({ name: 'tb_categorias' })
export class Categoria {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 60, nullable: false })
  @Length(4, 60, { message: 'Nome categoria deve ter entre 4 a 60 caracteres' })
  @IsNotEmpty({ message: 'Nome é obrigatório' })
  @Transform((param) => param.value.trim())
  nome: string;

//   @OneToMany(() => Produto, (produto) => produto.categoria)
//   produtos: Produto[];
}
