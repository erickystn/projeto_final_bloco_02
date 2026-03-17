import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ProdutoModule } from './produto/produto.module';
import { CategoriaModule } from './categoria/categoria.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Categoria } from './categoria/entities/categoria.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      ssl: true,
      entities: [Categoria],
      autoLoadEntities: false,
      synchronize: true,
      extra: {
        ssl: {
          rejectUnauthorized: false,
        },
        // Configurações otimizadas para Neon
        max: 1,
        connectionTimeoutMillis: 0,
        idleTimeoutMillis: 30000,
      },
      logging: true,
    }),
    ProdutoModule, 
    CategoriaModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
