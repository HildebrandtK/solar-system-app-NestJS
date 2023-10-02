import { Injectable } from '@nestjs/common';
import { Planet } from './planetInterface';

@Injectable()
export class PlanetService {
  private readonly planets: Record<string, Planet>;

  constructor() {
    this.planets = {
      Mercury: { name: 'Mercury', radius: 2439.7, distanceToSun: 57.9 },
      Venus: { name: 'Venus', radius: 6051.8, distanceToSun: 108.2 },
      Earth: { name: 'Earth', radius: 6371, distanceToSun: 149.6 },
      Mars: { name: 'Mars', radius: 3389.5, distanceToSun: 227.9 },
      Jupiter: { name: 'Jupiter', radius: 69911, distanceToSun: 778.6 },
      Saturn: { name: 'Saturn', radius: 58232, distanceToSun: 1433.5 },
      Uranus: { name: 'Uranus', radius: 25362, distanceToSun: 2872.5 },
      Neptune: { name: 'Neptune', radius: 24622, distanceToSun: 4495.1 },
    };
  }

  getPlanet(name: string): Planet | undefined {
    const planet = this.planets[this.parseName(name)];
    return planet ? { ...planet } : undefined;
  }

  getAllPlanets(): Planet[] {
    return Object.values(this.planets).map((planet) => ({ ...planet }));
  }

  createPlanet(planet: Planet) {
    const name = this.parseName(planet.name);

    if (this.getPlanet(name)) {
      throw new Error(
        `Planet ${name} already exists. Use updatePlanet to modify it.`,
      );
    }

    planet.name = name;

    this.planets[name] = planet;
  }

  updatePlanet(name: string, planet: Planet): void {
    if (!this.getPlanet(name)) {
      throw new Error(`Planet ${name} not found`);
    }
    this.planets[name] = planet;
  }

  deletePlanet(name: string): void {
    if (!this.getPlanet(name)) {
      throw new Error(`Planet ${name} not found`);
    }
    delete this.planets[name];
  }

  private parseName(name: string): string {
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  }
}
