import { Type, Transform } from "class-transformer";
import { IsNotEmpty, Length, IsNumber, Min, IsDate, MinDate, IsOptional, IsUrl, IsObject } from "class-validator";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Categoria } from "../../categoria/entities/categoria.entity";
import { NumericTransformer } from "../../util/NumericTransformer";

@Entity({ name: 'tb_produtos' })
export class Produto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 60, nullable: false })
  @IsNotEmpty({ message: 'O nome do produto é Obrigatório' })
  @Length(4, 60, { message: 'O tamanho deve ter entre 4 e 60 caracteres' })
  @Transform((param) => param.value.trim())
  nome: string;

  @Column('decimal', {
    precision: 6,
    nullable: false,
    scale: 2,
    transformer: new NumericTransformer(),
  })
  @IsNotEmpty({ message: 'O preço do produto é Obrigatório' })
  @IsNumber(
    { maxDecimalPlaces: 2 },
    { message: 'O preço deve ter 2 casas decimais' },
  )
  @Min(0, { message: 'O preço não pode ser negativo' })
  @Type(() => Number)
  preco: number;

  @Column('date', { nullable: false })
  @Type(() => Date)
  @IsDate()
  @MinDate(
    () => {
      const data = new Date();
      data.setDate(data.getDate() + 2);
      return data;
    },
    {
      message: 'A vencimento precisar ter no minimo 2 dias do dia atual',
    },
  )
  validade: Date;

  @Column('int', { nullable: true, default: 0 })
  @Min(0, { message: 'A quantidade não pode ser negativa' })
  quantidade: number;

  @Column('varchar', { length: 255, nullable: true })
  @IsOptional()
  @IsUrl()
  imgUrl: string;

  @IsObject({ message: 'Categoria precisa ser um objeto' })
  @ManyToOne(() => Categoria, (categoria) => categoria.produtos, {
    onDelete: 'CASCADE',
  })
  categoria: Categoria;
}