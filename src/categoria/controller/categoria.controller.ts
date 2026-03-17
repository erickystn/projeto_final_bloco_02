import { Controller, Get, Post, Body, Param, Delete, HttpCode, HttpStatus, Put, ParseIntPipe, UseGuards } from '@nestjs/common';
import { CategoriaService } from '../service/categoria.service';
import { Categoria } from '../entities/categoria.entity';
import { DeleteResult } from 'typeorm';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/guard/jwt-auth.guard';

@ApiTags('Categoria')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('categorias')
export class CategoriaController {
  constructor(private readonly categoriaService: CategoriaService) {}

  @Get('id/:id')
  @HttpCode(HttpStatus.OK)
  findById(@Param('id', ParseIntPipe) id: number): Promise<Categoria> {
    return this.categoriaService.findById(id);
  }

  @Get('nome/:nome')
  @HttpCode(HttpStatus.OK)
  findByNome(@Param('nome') nome:string): Promise<Categoria> {
    return this.categoriaService.findByNome(nome);
  }

  @Get('/all')
  @HttpCode(HttpStatus.OK)
  findAll(): Promise<Categoria[]> {
    return this.categoriaService.findAll();
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body()categoria: Categoria): Promise<Categoria> {
   return this.categoriaService.create(categoria);

  }

  @Put()
  @HttpCode(HttpStatus.OK)
  update(categoria: Categoria): Promise<Categoria> {
    return this.categoriaService.update(categoria);
  }

  @Delete(":id")
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id',ParseIntPipe)id: number): Promise<DeleteResult> {
    return this.categoriaService.delete(id)
  }
}
