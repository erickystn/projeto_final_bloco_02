import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult, MoreThan, LessThan, ILike } from 'typeorm';
import { CategoriaService } from '../../categoria/service/categoria.service';
import { Produto } from '../entities/produto.entity';

@Injectable()
export class ProdutoService {
  constructor(
    @InjectRepository(Produto) private produtoRepository: Repository<Produto>,
    private readonly categoriaService: CategoriaService,
  ) {}

  async findById(id: number): Promise<Produto> {
    const resultado = await this.produtoRepository.findOne({
      where: { id },
      relations: { categoria: true },
    });
    if (resultado == null) {
      throw new HttpException(
        `Produto com id ${id} não encontrado`,
        HttpStatus.NOT_FOUND,
      );
    }
    return resultado;
  }

   async findAllByNome(nome:string): Promise<Produto[]> {
    console.log(nome);
    return await this.produtoRepository.find({
      where: { nome: ILike(`%${nome}%`) },
      relations: { categoria: true },
    });  
  }

  async findAll(): Promise<Produto[]> {
    return this.produtoRepository.find({ relations: { categoria: true } });
  }


  async create(produto: Produto): Promise<Produto> {
    const { id, ...novoProduto } = produto;
    await this.categoriaService.findById(produto.categoria.id);
    return this.produtoRepository.save(novoProduto);
  }

  async update(produto: Produto): Promise<Produto> {
    await this.categoriaService.findById(produto.categoria.id);
    if(!produto.id) throw new HttpException(
        `Atributo ${produto.id} é obrigatório`,
        HttpStatus.BAD_REQUEST,
      );
    produto.id = Math.abs(produto.id);
    await this.findById(produto.id);
    return this.produtoRepository.save(produto);
  }

  async delete(id: number): Promise<DeleteResult> {
    await this.findById(Math.abs(id));
    return this.produtoRepository.delete(id);
  }

  async findPrecoMoreThan(value: number): Promise<Produto[]> {
    const resultado = await this.produtoRepository.find({
      where: { preco: MoreThan(value) },
      relations: { categoria: true },
      order: { preco: 'ASC' },
    });
    return resultado;
  }
  async findPrecoLessThan(value: number): Promise<Produto[]> {
    const resultado = await this.produtoRepository.find({
      where: { preco: LessThan(value) },
      relations: { categoria: true },
      order: { preco: 'DESC' },
    });
    return resultado;
  }
}
