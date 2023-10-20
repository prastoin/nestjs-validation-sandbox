import { Controller, Get, Param, Query, Res } from '@nestjs/common';
import { Response } from "express";
import { GetCountryCodeQuery, GetLanguagesQuery, GetRegionParam, MultipleQuery } from './queryParam.model';

@Controller()
export class QueryParamController {
    constructor() { }

    @Get("/country/:region")
    getCountry(@Query() code: GetCountryCodeQuery, @Param() { region }: GetRegionParam, @Res() res: Response) {
        return res.status(200).send()
    }

    @Get("/languages")
    getLanguage(@Query() { languages }: GetLanguagesQuery, @Res() res: Response) {
        return res.status(200).send()
    }

    @Get("/multiple-queries")
    getMultipleQueries(@Query() { bar, foo }: MultipleQuery, @Res() res: Response) {
        return res.json({ bar, foo }).status(200).send()
    }

}
