import { Injectable } from '@nestjs/common';
import { PlanetService } from './data/PlanetService';
import { Planet } from './data/planetInterface';
import { PlanetDto } from './dto/planet.dto';

@Injectable()
export class SolarSystemService {
  private readonly planetData: PlanetService;

  constructor() {
    this.planetData = new PlanetService();
  }

  getPlanet(name: string): Planet {
    const planet = this.planetData.getPlanet(name);
    if (!planet) {
      throw new Error(`Planet ${name} not found`);
    }
    return planet;
  }

  getAllPlanets(): Planet[] {
    return this.planetData.getAllPlanets();
  }

  createPlanet(planetData: PlanetDto): void {
    const { name, radius, distanceToSun } = planetData;

    this.validatePlanetData(radius, distanceToSun);
    if (this.planetData.getPlanet(name)) {
      throw new Error(`Planet ${name} already exists.`);
    }

    const newPlanet: Planet = {
      name,
      radius,
      distanceToSun,
    };

    this.planetData.createPlanet(newPlanet);
  }

  updatePlanet(planetData: PlanetDto, name: string): void {
    const { name: newName, radius, distanceToSun } = planetData;
    this.validatePlanetData(radius, distanceToSun);

    if (!this.planetData.getPlanet(name)) {
      throw new Error(`Planet ${name} not found.`);
    }

    this.planetData.deletePlanet(name);

    const updatedPlanet: Planet = {
      name: newName ? newName : name,
      radius,
      distanceToSun,
    };

    this.planetData.createPlanet(updatedPlanet);
  }

  deletePlanet(name: string): void {
    const planet = this.planetData.getPlanet(name);
    if (!planet) {
      throw new Error(`Planet ${name} not found`);
    }
    this.planetData.deletePlanet(name);
  }

  sortByDistanceToPlanet(name: string, ascending: boolean = true): Planet[] {
    const referencePlanet = this.planetData.getPlanet(name);
    if (!referencePlanet) {
      throw new Error(`Planet ${name} not found`);
    }
    const sortedPlanets = this.getAllPlanets();
    sortedPlanets.sort(
      (a, b) =>
        Math.abs(a.distanceToSun - referencePlanet.distanceToSun) -
        Math.abs(b.distanceToSun - referencePlanet.distanceToSun),
    );

    return ascending ? sortedPlanets : sortedPlanets.reverse();
  }

  sortByRadius(ascending: boolean = true): Planet[] {
    const sortedPlanets = this.planetData
      .getAllPlanets()
      .sort((a, b) => a.radius - b.radius);

    return ascending ? sortedPlanets : sortedPlanets.reverse();
  }

  sortByDistanceToSun(ascending: boolean = true): Planet[] {
    const sortedPlanets = this.planetData
      .getAllPlanets()
      .sort((a, b) => a.distanceToSun - b.distanceToSun);

    const planets = ascending ? sortedPlanets : sortedPlanets.reverse();

    return planets;
  }

  getDistanceBetweenPlanets(planet1: string, planet2: string): number {
    const p1 = this.planetData.getPlanet(planet1)?.distanceToSun;
    const p2 = this.planetData.getPlanet(planet2)?.distanceToSun;
    if (p1 && p2) {
      return Math.abs(p1 - p2);
    }

    throw new Error('You have to provide two existing planet names');
  }

  private validatePlanetData(radius: number, distanceToSun: number): void {
    if (radius <= 0 || distanceToSun <= 0) {
      throw new Error('Radius and distanceToSun must be positive numbers.');
    }
  }
}
