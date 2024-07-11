import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);


app.enableCors({
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false, //son para las solicitudes OPTIONS
  optionsSuccessStatus: 204, //son para las solicitudes OPTIONS
  credentials:true //Permite el envío de cookies y credenciales (como tokens de autenticación) en las solicitudes CORS.  Si tu aplicación necesita autenticación, debes establecer esto en true.
})



  await app.listen(3000);
}
bootstrap();
