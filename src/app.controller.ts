import { Body, Controller, HttpStatus, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from "express";
import { PingRequestBody } from './app.models';

@Controller()
export class AppController {
  constructor() { }

  @Post("/ping")
  getPing(@Body() _body: PingRequestBody, @Req() req: Request, @Res() res: Response) {
    return res.json({ pong: "pong" }).status(HttpStatus.CREATED).send();
  }

}
