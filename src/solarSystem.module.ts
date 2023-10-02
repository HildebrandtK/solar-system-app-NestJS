import { Module } from '@nestjs/common';
import { SolarSystemController } from './solarSystem.controller';
import { SolarSystemService } from './solarSystem.service';

@Module({
  imports: [],
  controllers: [SolarSystemController],
  providers: [SolarSystemService],
})
export class SolarSystemModule {}
