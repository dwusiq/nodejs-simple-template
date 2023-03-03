import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import config from "./Config";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.setGlobalPrefix("/tslServer/api");
  await app.listen(config.serverPort);
  console.log("server start success,linten port:", +config.serverPort);
}
bootstrap();
