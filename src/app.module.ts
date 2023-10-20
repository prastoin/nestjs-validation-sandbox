import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { QueryParamController } from './queryParam.controller';

@Module({
  imports: [],
  controllers: [AppController, QueryParamController],
})
export class AppModule { }
