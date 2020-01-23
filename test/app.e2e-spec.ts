// eslint-disable-next-line @typescript-eslint/no-unused-vars,@typescript-eslint/tslint/config
import { Test, TestingModule } from '@nestjs/testing';
// eslint-disable-next-line @typescript-eslint/tslint/config
import * as request from 'supertest';

import { AppModule } from './../src/app.module';

describe('AuthController (e2e)', () => {
    let app;

    beforeEach(async () => {
        const moduleFixture = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('/ (GET)', () =>
        request(app.getHttpServer())
            .get('/')
            .expect(200)
            .expect('Hello World!'));
});
