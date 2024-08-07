import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);


app.enableCors({
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false, //son para las solicitudes OPTIONS
  optionsSuccessStatus: 204, //son para las solicitudes OPTIONS
  credentials:true //Permite el envío de cookies y credenciales (como tokens de autenticación) en las solicitudes CORS.  Si tu aplicación necesita autenticación, debes establecer esto en true.
})

const config = new DocumentBuilder()
.setTitle("first real crud")
.setDescription("crud with DB")
.setVersion("1.0")
.build();
const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup("docs", app, document); //se puedde cambiar docs, ese es el nombre dela documentacio

app.useGlobalPipes(new ValidationPipe())
  await app.listen(3000);
  //await app.listen(parseInt(process.env.PORT) || 3001); // asi deberia ser para llevarlo a produccion
}
bootstrap();
