import { PlanetService } from '../data/planetService';

describe('planetService', () => {
  let planetService: PlanetService;

  beforeEach(() => {
    planetService = new PlanetService();
  });

  it('should create a planet', () => {
    const planet = {
      name: 'Testplanet',
      radius: 1000,
      distanceToSun: 2000,
    };
    planetService.createPlanet(planet);
    const retrievedPlanet = planetService.getPlanet(planet.name);
    expect(retrievedPlanet).toEqual(planet);
    planetService.deletePlanet(planet.name);
  });

  it('should not allow creating a planet with the same name', () => {
    const planet = {
      name: 'Duplicateplanet',
      radius: 1000,
      distanceToSun: 2000,
    };
    planetService.createPlanet(planet);

    expect(() => planetService.createPlanet(planet)).toThrowError(
      'Planet Duplicateplanet already exists. Use updatePlanet to modify it.',
    );
  });

  it('should update a planet', () => {
    const planet = {
      name: 'Testplanet',
      radius: 1000,
      distanceToSun: 2000,
    };
    planetService.createPlanet(planet);

    const updatedPlanet = {
      name: 'Testplanet',
      radius: 1500,
      distanceToSun: 2500,
    };
    planetService.updatePlanet(planet.name, updatedPlanet);

    const retrievedPlanet = planetService.getPlanet(planet.name);
    expect(retrievedPlanet).toEqual(updatedPlanet);
  });

  it('should not allow updating a non-existent planet', () => {
    const planet = {
      name: 'Nonexistentplanet',
      radius: 1000,
      distanceToSun: 2000,
    };

    expect(() => planetService.updatePlanet(planet.name, planet)).toThrowError(
      'Planet Nonexistentplanet not found',
    );
  });

  it('should delete a planet', () => {
    const planet = {
      name: 'Testplanet',
      radius: 1000,
      distanceToSun: 2000,
    };
    planetService.createPlanet(planet);
    planetService.deletePlanet(planet.name);
    const retrievedPlanet = planetService.getPlanet(planet.name);
    expect(retrievedPlanet).toBeUndefined();
  });

  it('should not allow deleting a non-existent planet', () => {
    const planetName = 'Nonexistentplanet';

    expect(() => planetService.deletePlanet(planetName)).toThrowError(
      `Planet ${planetName} not found`,
    );
  });
});
