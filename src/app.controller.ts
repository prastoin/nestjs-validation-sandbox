import { Controller, Get, HttpStatus, Req, Res } from '@nestjs/common';
import { Request, Response } from "express";

@Controller()
export class AppController {
  constructor() { }

  @Get("/ping")
  getPing(@Req() req: Request, @Res() res: Response) {
    return res.json({ pong: "pong" }).status(HttpStatus.CREATED).send();
  }
}
