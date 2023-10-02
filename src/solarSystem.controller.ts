import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Res,
} from '@nestjs/common';
import { SolarSystemService } from './solarSystem.service';

import { PlanetDto } from './dto/planet.dto';
import { Response, response } from 'express';

@Controller()
export class SolarSystemController {
  constructor(private readonly solarSystem: SolarSystemService) {}
  @Get('')
  hello() {
    return 'Welcome to Solar System Service!';
  }
  @Get('planets/')
  getPlanets(@Res() res: Response) {
    try {
      res.send(this.solarSystem.getAllPlanets());
    } catch (err) {
      res.send(err.message);
    }
  }

  @Get('planets/:name')
  getPlanet(@Param('name') name: string, @Res() res: Response) {
    try {
      res.send(this.solarSystem.getPlanet(name));
    } catch (err) {
      res.send(err.message);
    }
  }

  @Post('planets/create')
  createPlanet(@Body() planetData: PlanetDto, @Res() res: Response) {
    try {
      this.solarSystem.createPlanet(planetData);
      res
        .status(201)
        .send({ msg: `Planet ${planetData.name} succesfully created.` });
    } catch (err) {
      res.send({ message: err.message });
    }
  }

  @Put('planets/:name/update/')
  updatePlanet(
    @Param('name') name: string,
    @Body() planetData: PlanetDto,
    @Res() res: Response,
  ) {
    try {
      this.solarSystem.updatePlanet(planetData, name);
      res.status(200).send({ message: `Planet ${name} succesfully updated` });
    } catch (err) {
      res.send(err.message);
    }
  }

  @Delete('planets/delete/:name')
  deletePlanet(@Param('name') name: string, @Res() res: Response) {
    try {
      this.solarSystem.deletePlanet(name);
      res.status(200).send({ message: `Planet ${name} succesfully deleted` });
    } catch (err) {
      res.send(err.message);
    }
  }

  @Get('planets/sort-by-radius')
  sortPlanetsByRadius(
    @Query('asc') asc: string = 'true',
    @Res() res: Response,
  ) {
    try {
      const isAscending = asc === 'true';
      res.send(this.solarSystem.sortByRadius(isAscending));
    } catch (err) {
      console.log(err.message);
      res.send(err.message);
    }
  }

  @Get('planets/sort-by-distance-to-sun')
  sortPlanetsByDistanceToSun(
    @Query('asc') asc: string = 'true',
    @Res() res: Response,
  ) {
    try {
      const isAscending = asc === 'true';
      res.send(this.solarSystem.sortByDistanceToSun(isAscending));
    } catch (err) {
      console.log(err.message);
      res.send(err.message);
    }
  }

  @Get('planets/sort-by-distance-to-planet/:name')
  sortByDistanceToPlanet(
    @Param('name') name: string,
    @Query('asc') asc: string = 'true',
    @Res() res: Response,
  ) {
    try {
      const isAscending = asc === 'true';
      res.send(this.solarSystem.sortByDistanceToPlanet(name, isAscending));
    } catch (err) {
      console.log(err.messsage);
      res.send(err.message);
    }
  }

  @Get('planets/:name1/get-distance/:name2')
  getDistanceBetweenPlanets(
    @Param('name1') name1: string,
    @Param('name2') name2: string,
    @Res() res: Response,
  ) {
    try {
      res.send(this.solarSystem.getDistanceBetweenPlanets(name1, name2));
    } catch (err) {
      console.log(err.message);
      res.send(err.message);
    }
  }
}
