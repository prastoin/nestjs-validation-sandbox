import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { NestedObject, ObjectWithArray, ObjectwithPrimitiveArray, PrimitiveObject, RecordObject } from './objects.model';

@Controller()
export class BodyController {
    constructor() { }

    @Post("/post-primitive-object")
    postBasicObject(@Body() _body: PrimitiveObject, @Req() req: Request, @Res() res: Response) {
        return res.status(200).send();
    }

    @Post("/post-object-primitive-array")
    postObjectWithPrimitiveArray(@Body() _body: ObjectwithPrimitiveArray, @Req() req: Request, @Res() res: Response) {
        return res.status(200).send();
    }

    @Post("/post-object-array")
    postObjectWithArray(@Body() _body: ObjectWithArray, @Req() req: Request, @Res() res: Response) {
        return res.status(200).send();
    }

    @Post("/post-nested-object")
    postNestedObject(@Body() _body: NestedObject, @Req() req: Request, @Res() res: Response) {
        return res.status(200).send();
    }

    @Post("/post-record-object")
    postRecordObject(@Body() _body: RecordObject, @Req() req: Request, @Res() res: Response) {
        return res.status(200).send();
    }
}
