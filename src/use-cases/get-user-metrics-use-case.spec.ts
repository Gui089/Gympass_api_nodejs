import { describe, it, beforeEach, expect } from 'vitest';
import { InMemoryCheckInsRepository } from '../repositories/in-memory/in-memory-checkins-repository';

import { GetUserMetricsUseCase } from './get-user-metrics-use-case';

let checkinsRepository: InMemoryCheckInsRepository;
let sut: GetUserMetricsUseCase;

describe('Get user Metrics Use Case', () => {

  beforeEach(async () => {
    checkinsRepository = new InMemoryCheckInsRepository();
    sut = new GetUserMetricsUseCase(checkinsRepository);
  });

  it('Should be able checkins count from metrics', async () => {

    await checkinsRepository.create({
      gym_id: 'gym-01',
      user_id: 'user-01'
    });

    await checkinsRepository.create({
      gym_id: 'gym-02',
      user_id: 'user-01'
    });

    const { checkInsCount } = await sut.execute({
      userId: 'user-01',
    });

    expect(checkInsCount).toEqual(2);
  });

});