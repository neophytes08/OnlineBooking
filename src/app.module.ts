import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AuthModule } from '@module/auth/auth.module';
import { config as ormConfig } from './ormconfig';

@Module({
  imports: [AuthModule, TypeOrmModule.forRoot(ormConfig)],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
