import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
// TODO SETUP tsconfig paths and jest moduleNameMapper correctly
import { AppModule } from '../../src/app.module';

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

    it('Should fail to validate required query params', () => {
        const expectedError = {
            message: [
                'code should not be null or undefined',
                'code must be one of the following values: JO, KZ, ZM, ZW'
            ],
            error: 'Bad Request',
            statusCode: 400
        }
        const pathParam = "AMER"
        return request(app.getHttpServer())
            .get(`/country/${pathParam}`)
            .expect(400)
            .expect(expectedError);
    });
});
