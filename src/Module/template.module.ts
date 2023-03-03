import { Module } from "@nestjs/common";
import { TemplateManager } from "../Manager/template.manager";

//TODO 临时方案

@Module({
  controllers: [],
  providers: [TemplateManager],
})
export class TemplateModule {}
