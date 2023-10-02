import { SolarSystemService } from '../solarSystem.service';

describe('SolarSystemService', () => {
  let solarSystemService: SolarSystemService;

  beforeEach(() => {
    solarSystemService = new SolarSystemService();
  });

  it('should get a planet', () => {
    const planetName = 'Earth';
    const planet = solarSystemService.getPlanet(planetName);
    expect(planet.name).toBe(planetName);
  });

  it('should throw an error when getting a non-existent planet', () => {
    const planetName = 'Nonexistentplanet';
    expect(() => solarSystemService.getPlanet(planetName)).toThrowError(
      `Planet ${planetName} not found`,
    );
  });

  it('should get all planets', () => {
    const planets = solarSystemService.getAllPlanets();
    expect(planets).toHaveLength(8);
  });

  it('should create a planet', () => {
    const planetName = 'Testplanet';
    const radius = 1000;
    const distanceToSun = 2000;
    solarSystemService.createPlanet({
      name: planetName,
      radius,
      distanceToSun,
    });

    const createdPlanet = solarSystemService.getPlanet(planetName);
    expect(createdPlanet.name).toBe(planetName);
  });

  it('should not allow creating a planet with the same name', () => {
    const planetName = 'Duplicateplanet';
    const radius = 1000;
    const distanceToSun = 2000;
    solarSystemService.createPlanet({
      name: planetName,
      radius,
      distanceToSun,
    });

    expect(() =>
      solarSystemService.createPlanet({
        name: planetName,
        radius,
        distanceToSun,
      }),
    ).toThrowError('Planet Duplicateplanet already exists.');
  });

  it('should throw an error for invalid planet data', () => {
    const name = 'Invalidplanet';
    const radius = -10;
    const distanceToSun = 200;

    expect(() => {
      solarSystemService.createPlanet({
        name,
        radius,
        distanceToSun,
      });
    }).toThrowError('Radius and distanceToSun must be positive numbers.');
  });

  it('should update a planet', () => {
    const planetName = 'Testplanet';
    const radius = 1000;
    const distanceToSun = 2000;
    solarSystemService.createPlanet({
      name: planetName,
      radius,
      distanceToSun,
    });

    const updatedRadius = 1500;
    const updatedDistanceToSun = 2500;
    solarSystemService.updatePlanet(
      {
        name: planetName,
        radius: updatedRadius,
        distanceToSun: updatedDistanceToSun,
      },
      planetName,
    );

    const updatedPlanet = solarSystemService.getPlanet(planetName);
    expect(updatedPlanet.radius).toBe(updatedRadius);
    expect(updatedPlanet.distanceToSun).toBe(updatedDistanceToSun);
  });

  it('should not allow updating a non-existent planet', () => {
    const planetName = 'Nonexistentplanet';
    const radius = 1000;
    const distanceToSun = 2000;

    expect(() =>
      solarSystemService.updatePlanet(
        {
          name: planetName,
          radius,
          distanceToSun,
        },
        planetName,
      ),
    ).toThrowError(`Planet ${planetName} not found.`);
  });

  it('should delete a planet', () => {
    const planetName = 'Testplanet';
    const radius = 1000;
    const distanceToSun = 2000;
    solarSystemService.createPlanet({
      name: planetName,
      radius,
      distanceToSun,
    });
    solarSystemService.deletePlanet(planetName);

    expect(() => solarSystemService.getPlanet(planetName)).toThrowError(
      `Planet ${planetName} not found`,
    );
  });

  it('should not allow deleting a non-existent planet', () => {
    const planetName = 'Nonexistentplanet';

    expect(() => solarSystemService.deletePlanet(planetName)).toThrowError(
      `Planet ${planetName} not found`,
    );
  });

  it('should sort planets by distance to a reference planet in descending order', () => {
    const result = solarSystemService.sortByDistanceToPlanet('Earth', false);

    if (Array.isArray(result)) {
      const sortedPlanets = result;
      const expectedOrder = [
        'Neptune',
        'Uranus',
        'Saturn',
        'Jupiter',
        'Mercury',
        'Mars',
        'Venus',
        'Earth',
      ];

      expect(sortedPlanets.map((planet) => planet.name)).toEqual(expectedOrder);
    } else {
      fail('Expected an array of planets, but got an error');
    }
  });

  it('should sort planets by distance to a reference planet in ascending order', () => {
    const result = solarSystemService.sortByDistanceToPlanet('Earth');

    if (Array.isArray(result)) {
      const sortedPlanets = result;
      const expectedOrder = [
        'Earth',
        'Venus',
        'Mars',
        'Mercury',
        'Jupiter',
        'Saturn',
        'Uranus',
        'Neptune',
      ];

      expect(sortedPlanets.map((planet) => planet.name)).toEqual(expectedOrder);
    } else {
      fail('Expected an array of planets, but got an error');
    }
  });

  it('should calculate the distance between two planets', () => {
    const distance = solarSystemService.getDistanceBetweenPlanets(
      'Earth',
      'Mars',
    );
    expect(distance).toBeCloseTo(227.9 - 149.6);
  });
});
