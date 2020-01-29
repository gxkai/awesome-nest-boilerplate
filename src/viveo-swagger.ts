import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function setupSwagger(app: INestApplication) {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const version = require('../package.json').version || '';
    const options = new DocumentBuilder()
        .setTitle('API')
        .setVersion(version)
        .addBearerAuth()
        .setBasePath(process.env.PREFIX)
        .setSchemes('http')
        .addBearerAuth('Authorization', 'header')
        .build();

    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('docs', app, document);
}
