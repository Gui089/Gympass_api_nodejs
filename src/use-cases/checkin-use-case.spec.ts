import { describe, it, beforeEach, expect } from 'vitest';
import { InMemoryCheckInsRepository } from '../repositories/in-memory/in-memory-checkins-repository';
import { CheckInUseCase } from './checkin-use-case';

let checkinsRepository: InMemoryCheckInsRepository;
let sut: CheckInUseCase;

describe('CheckIn Use Case', () => {

  beforeEach(() => {
    checkinsRepository = new InMemoryCheckInsRepository;
    sut = new CheckInUseCase(checkinsRepository);
  });

  it('Should not be able to check in ', async () => {
    const {checkIn} = await sut.execute({
      gymId:'gym-01',
      userId:'user-01'
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });
});