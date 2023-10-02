import { NestFactory } from '@nestjs/core';
import { SolarSystemModule } from './solarSystem.module';

async function bootstrap() {
  const app = await NestFactory.create(SolarSystemModule);
  await app.listen(3000);
}
bootstrap();
