import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from './../entities/usuario.entity';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Bcrypt } from '../../auth/bcrypt/bcrypt';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario) private usuarioRepository: Repository<Usuario>,
    private bcrypt: Bcrypt,
  ) {}

  async findAll() {
    return await this.usuarioRepository.find();
  }

  async findByUsuario(usuario: string): Promise<Usuario | null> {
    
    return await this.usuarioRepository.findOne({
      where: {usuario},
    });
  }

  async findById(id: number) {
    const usuario = await this.usuarioRepository.findOne({
      where: {
        id,
      },
    });

    if (!usuario)
      throw new HttpException('Usuario não encontrado!', HttpStatus.NOT_FOUND);

    return usuario;
  }

  async create(usuario: Usuario) {
    const buscaUsuario = await this.findByUsuario(usuario.usuario);

    if (buscaUsuario)
      throw new HttpException('O Usuario já existe!', HttpStatus.BAD_REQUEST);

    const {id, ...usuarioSemId} = usuario;
    usuarioSemId.senha = await this.bcrypt.criptografarSenha(usuario.senha);
    return await this.usuarioRepository.save(usuarioSemId);
  }

  async update(usuario: Usuario) {
    await this.findById(usuario.id);

    const buscaUsuario = await this.findByUsuario(usuario.usuario);

    if (buscaUsuario && buscaUsuario.id !== usuario.id)
      throw new HttpException(
        'Usuário (e-mail) já Cadastrado!',
        HttpStatus.BAD_REQUEST,
      );

    usuario.senha = await this.bcrypt.criptografarSenha(usuario.senha);
    return await this.usuarioRepository.save(usuario);
  }

  // remove(id: number) {
  //   return `This action removes a #${id} usuario`;
  // }
}
