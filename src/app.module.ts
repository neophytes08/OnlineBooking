import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { config as ormConfig } from './ormconfig';

@Module({
  imports: [AuthModule, TypeOrmModule.forRoot(ormConfig)],
  controllers: [AppController, AuthController],
  providers: [],
})
export class AppModule {}
