import { expect, describe, it, beforeEach } from 'vitest';
import { InMemoryGymRepository } from '../repositories/in-memory/in-memory-gyms-repository';
import { CreateGymUseCase } from './create-gym-use-case';

let gymRepository: InMemoryGymRepository;
let sut: CreateGymUseCase;

describe('Register Use Case', () => {

    beforeEach(() => {
      gymRepository = new InMemoryGymRepository;
      sut = new CreateGymUseCase(gymRepository);
    });

    it('Should be able to create gym', async () => {

        const { gym } = await sut.execute({
            title:'Javascript gym',
            description:'academia javascript',
            phone:'33354523',
            latitude: -13.6109358,
            longitude: -42.9346089,
        });


        expect(gym.id).toEqual(expect.any(String));
    });

});