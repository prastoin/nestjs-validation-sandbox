import { Body, Controller, Get, HttpStatus, Param, Post, Query, Req, Res } from '@nestjs/common';
import { Request, Response } from "express";
import { GetCountryCodeQuery, GetCountryRegionParam, GetLanguagesQuery, PingRequestBody } from './app.models';

@Controller()
export class AppController {
  constructor() { }

  @Post("/ping")
  getPing(@Body() _body: PingRequestBody, @Req() req: Request, @Res() res: Response) {
    return res.json({ pong: "pong" }).status(HttpStatus.CREATED).send();
  }

  @Get("/country/:region")
  getCountry(@Query() code: GetCountryCodeQuery, @Param() region: GetCountryRegionParam, @Res() res: Response) {
    console.log({ code })
    return res.status(200).send()
  }

  @Get("/languages")
  getLanguage(@Query() languages: GetLanguagesQuery, @Res() res: Response) {
    return res.status(200).send()
  }
}
