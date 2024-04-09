import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import config from "./Config";
import { TransformInterceptor } from "./Common/Response/TransformInterceptor";


async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.setGlobalPrefix("/tmpService/api");
  app.useGlobalInterceptors(new TransformInterceptor());
  await app.listen(config.serverPort);
  console.log("server start success,linten port:", +config.serverPort);
}
bootstrap();
