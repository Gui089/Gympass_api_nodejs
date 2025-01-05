import { describe, it, beforeEach, expect } from 'vitest';
import { InMemoryGymRepository } from '../repositories/in-memory/in-memory-gyms-repository';
import { SearchGymsUseCase } from './search-gyms-use-case';

let GymsRepository: InMemoryGymRepository;
let sut: SearchGymsUseCase;

describe('Search Gyms Use Case', () => {

  beforeEach(async () => {
    GymsRepository = new InMemoryGymRepository();
    sut = new SearchGymsUseCase(GymsRepository);
  });

  it('Should be able to search for gyms', async () => {

    await GymsRepository.create({
      title: 'Javascript gym',
      description: 'academia javascript',
      phone: '33354523',
      latitude: -13.6109358,
      longitude: -42.9346089,

    });

    await GymsRepository.create({
      title: 'Typescript gym',
      description: 'academia javascript',
      phone: '33354523',
      latitude: -13.6109358,
      longitude: -42.9346089,
    });

    const { gyms } = await sut.execute({
      query:'Javascript gym',
      page:1
    });

    expect(gyms).toHaveLength(1);
    expect(gyms).toEqual([
      expect.objectContaining({ title:'Javascript gym' }),
    ]);
  });

});