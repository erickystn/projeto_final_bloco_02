import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Categoria } from '../entities/categoria.entity';
import { DeleteResult, ILike, Repository } from 'typeorm';

@Injectable()
export class CategoriaService {
  constructor(
    @InjectRepository(Categoria)
    private categoriaRepository: Repository<Categoria>,
  ) {}

  async findById(id: number): Promise<Categoria> {
    const resultado = await this.categoriaRepository.findOne({ where: { id } });

    if (resultado == null) {
      throw new HttpException('Categoria não encontrada', HttpStatus.NOT_FOUND);
    }

    return resultado;
  }

  async findByNome(nome: string): Promise<Categoria> {
    const resultado = await this.categoriaRepository.findOne({
      where: { nome: ILike(`%${nome}%`) },
    });

    if (resultado == null) {
      throw new HttpException(
        'Não foi encontrado nenhuma categoria combinasse com nome informado',
        HttpStatus.NOT_FOUND,
      );
    }

    return resultado;
  }

  async findAll(): Promise<Categoria[]> {
    return await this.categoriaRepository.find({
      /*relations: { produtos: true }*/
    });
  }
  async create(categoria: Categoria): Promise<Categoria> {
    const {id, ...novaCategoria} = categoria;
    return await this.categoriaRepository.save(novaCategoria);
  }

  async update(categoria: Categoria): Promise<Categoria> {
    await this.findById(categoria.id);
    return this.categoriaRepository.save(categoria);
  }

  async delete(id: number): Promise<DeleteResult> {
    await this.findById(id);
    return this.categoriaRepository.delete(id);
  }
}
