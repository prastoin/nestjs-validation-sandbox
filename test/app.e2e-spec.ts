import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PingRequestBody } from 'src/app.models';
import * as request from 'supertest';
// TODO SETUP tsconfig paths and jest moduleNameMapper correctly
import { AppModule } from '../src/app.module';

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

  it('/ping (GET)', () => {
    const body: PingRequestBody = {
      foo: "FOO",
      bar: "BARRE"
    }

    return request(app.getHttpServer())
      .post('/ping')
      .send(body)
      .expect(201)
      .expect({ pong: "pong" });
  });

  it('Should fail to validate invalid body', () => {
    const body = {
      bar: "BABAR"
    } as unknown as PingRequestBody

    const expectedError = {
      message: [
        'foo should not be null or undefined',
        'foo must be one of the following values: FOO, FOU',
        'bar must be one of the following values: BAR, BARRE'
      ],
      error: 'Bad Request',
      statusCode: 400
    }
    return request(app.getHttpServer())
      .post('/ping')
      .send(body)
      .expect(400)
      .expect(expectedError);
  });

});
