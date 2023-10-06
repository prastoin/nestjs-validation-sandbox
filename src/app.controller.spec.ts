import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from './app.module';

describe('Cats', () => {
    let app: INestApplication;

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({ imports: [AppModule] })
            .compile();

        app = moduleRef.createNestApplication();
        await app.init();
    });

    it(`/GET cats`, () => {
        const test = app.getHttpServer()
        return request(test)
            .get('/ping')
            .expect(200)
            .expect({
                pong: "pong",
            });
    });

    afterAll(async () => {
        await app.close();
    });
});