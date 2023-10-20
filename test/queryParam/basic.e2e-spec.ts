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

    it('/multiple-queries?foo=FRA&bar=42&foo=ENG (GET) Validation passes', () => {
        const expectedBody = {
            bar: '42',
            foo: ["FRA", "ENG"],
        }
        const queries = "?foo=FRA&bar=42&foo=ENG"
        return request(app.getHttpServer())
            .get(`/multiple-queries${queries}`)
            .expect(200)
            .expect(expectedBody);
    });

    it('/multiple-queries??foo=foo&bar=42&foo=bar (GET) Validation passes and maintain order', () => {
        const expectedBody = {
            bar: '42',
            foo: ["ENG", "FRA"],
        }
        const queries = "?foo[1]=FRA&bar=42&foo[0]=ENG"
        return request(app.getHttpServer())
            .get(`/multiple-queries${queries}`)
            .expect(200)
            .expect(expectedBody);
    });
});
