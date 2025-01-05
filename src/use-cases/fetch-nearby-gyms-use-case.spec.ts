import { describe, it, beforeEach, expect } from 'vitest';
import { InMemoryGymRepository } from '../repositories/in-memory/in-memory-gyms-repository';
import { FetchNearbyUseCase } from './fetch-nearby-gyms-use-case';

let GymsRepository: InMemoryGymRepository;
let sut: FetchNearbyUseCase;

describe('Fetch Neaby Gyms Use Case', () => {

  beforeEach(async () => {
    GymsRepository = new InMemoryGymRepository();
    sut = new FetchNearbyUseCase(GymsRepository);
  });

  it('Should be able to fetch neaby gyms', async () => {

    await GymsRepository.create({
      title: 'Near gym',
      description: 'academia javascript',
      phone: '33354523',
      latitude: -13.6109358,
      longitude: -42.9346089,

    });

    await GymsRepository.create({
      title: 'Far gym',
      description: 'academia javascript',
      phone: '33354523',
      latitude: -14.0616238,
      longitude: -42.4767186,
    });

    const { gyms } = await sut.execute({
      userLatitude: -13.6109358,
      userLongitude: -42.9346089,
    });

    expect(gyms).toHaveLength(1);
    expect(gyms).toEqual([
      expect.objectContaining({ title:'Near gym' }),
    ]);
  });

});