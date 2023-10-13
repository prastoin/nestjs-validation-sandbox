import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
    let app: INestApplication;

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();
        app = moduleFixture.createNestApplication();
        app.useGlobalPipes(new ValidationPipe({ transform: false }));
        await app.init();
    });

    afterAll(async () => {
        await app.close();
    });

    it("/languages?languages=ENG&languages=ITA (GET) Validation passes for array of several", () => {
        const expectedBody = {}
        const params = "languages=ENG&languages=ITA"
        const url = `/languages?${params}`
        console.log({ url })
        return request(app.getHttpServer())
            .get(url)
            .expect(200, expectedBody)
    })

    it("/languages?languages=ENG (GET) Validation passes for array of 1", () => {
        const expectedBody = {}
        const params = "languages=ENG"
        const url = `/languages?${params}`
        console.log({ url })
        return request(app.getHttpServer())
            .get(url)
            .expect(200, expectedBody)
    })

    it("/languages?languages=FOO?languages=BAR (GET) Validation fails for array of several invalid enum", () => {
        const expectedBody = {
            message: [
                'each value in languages must be one of the following values: FRA, ENG, ITA'
            ],
            error: 'Bad Request',
            statusCode: 400
        }
        const params = "languages=FOO?languages=BAR"
        const url = `/languages?${params}`
        console.log({ url })
        return request(app.getHttpServer())
            .get(url)
            .expect(400, expectedBody)
    })

    it("/languages?languages=FOO (GET) Validation fails for array of 1 invalid enum", () => {
        const expectedBody = {
            message: [
                'each value in languages must be one of the following values: FRA, ENG, ITA'
            ],
            error: 'Bad Request',
            statusCode: 400
        }
        const params = "languages=FOO"
        const url = `/languages?${params}`
        console.log({ url })
        return request(app.getHttpServer())
            .get(url)
            .expect(400, expectedBody)
    })
});
