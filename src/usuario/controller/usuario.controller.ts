import { Controller, Get, Post, Body, Param, Put, ParseIntPipe, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { UsuarioService } from '../service/usuario.service';
import { Usuario } from '../entities/usuario.entity';
import { JwtAuthGuard } from '../../auth/guard/jwt-auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Usuario')
@ApiBearerAuth()
@Controller('usuarios')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Post('/cadastrar')
  @HttpCode(HttpStatus.CREATED)
  create(@Body() usuario: Usuario) {
    return this.usuarioService.create(usuario);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/all')
  @HttpCode(HttpStatus.OK)
  findAll() {
    return this.usuarioService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  findById(@Param('id',ParseIntPipe) id: number) {
    return this.usuarioService.findById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put('/atualizar')
  @HttpCode(HttpStatus.OK)
  update( @Body() usuario: Usuario) {
    return this.usuarioService.update(usuario);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.usuarioService.remove(+id);
  // }
}
