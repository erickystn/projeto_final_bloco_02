import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Body,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { DeleteResult } from 'typeorm';
import { Produto } from '../entities/produto.entity';
import { ProdutoService } from '../service/produto.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/guard/jwt-auth.guard';

@ApiTags('Produto')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('produtos')
export class ProdutoController {
  constructor(private readonly produtoService: ProdutoService) {}

  @Get('id/:id')
  @HttpCode(HttpStatus.OK)
  findById(@Param('id', ParseIntPipe) id: number): Promise<Produto> {
    return this.produtoService.findById(id);
  }

  @Get('/all')
  @HttpCode(HttpStatus.OK)
  findAll(): Promise<Produto[]> {
    return this.produtoService.findAll();
  }

  @Get('preco-maior-que/:value')
  @HttpCode(HttpStatus.OK)
  findPrecoMoreThan(
    @Param('value', ParseIntPipe) value: number,
  ): Promise<Produto[]> {
    return this.produtoService.findPrecoMoreThan(value);
  }

  @Get('preco-menor-que/:value')
  @HttpCode(HttpStatus.OK)
  findPrecoLessThan(
    @Param('value', ParseIntPipe) value: number,
  ): Promise<Produto[]> {
    return this.produtoService.findPrecoLessThan(value);
  }

  @Get('nome/:nome')
  @HttpCode(HttpStatus.OK)
  findAllByNome(@Param('nome') nome: string): Promise<Produto[]> {
    return this.produtoService.findAllByNome(nome);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() produto: Produto): Promise<Produto> {
    return this.produtoService.create(produto);
  }

  @Put()
  @HttpCode(HttpStatus.OK)
  update(@Body() produto: Produto): Promise<Produto> {
    return this.produtoService.update(produto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id', ParseIntPipe) id: number): Promise<DeleteResult> {
    return this.produtoService.delete(id);
  }
}
