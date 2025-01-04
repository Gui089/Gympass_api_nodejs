import { describe, it, beforeEach, expect } from 'vitest';
import { InMemoryCheckInsRepository } from '../repositories/in-memory/in-memory-checkins-repository';
import { FetchCheckInUseCase } from './fetch-user-checkin-history-use-case';

let checkinsRepository: InMemoryCheckInsRepository;
let sut: FetchCheckInUseCase;

describe('Fetch user CheckIn Use Case', () => {

  beforeEach(async () => {
    checkinsRepository = new InMemoryCheckInsRepository();
    sut = new FetchCheckInUseCase(checkinsRepository);
  });

  it('Should be able to fetch check in history', async () => {

    await checkinsRepository.create({
      gym_id: 'gym-01',
      user_id: 'user-01'
    });

    await checkinsRepository.create({
      gym_id: 'gym-02',
      user_id: 'user-01'
    });

    const { checkIns } = await sut.execute({
      userId: 'user-01',
      page:1
    });

    expect(checkIns).toHaveLength(2);
    expect(checkIns).toEqual([
      expect.objectContaining({ gym_id: 'gym-01' }),
      expect.objectContaining({ gym_id: 'gym-02' })
    ]);
  });

  it('Should be able to fetch pagineted checkin history', async () => {

   for(let i = 1; i <= 22; i++) {
    await checkinsRepository.create({
      gym_id: `gym-${i}`,
      user_id: 'user-01'
    });
   }

    const { checkIns } = await sut.execute({
      userId: 'user-01',
      page:2
    });

    expect(checkIns).toHaveLength(2);
    expect(checkIns).toEqual([
      expect.objectContaining({ gym_id: 'gym-21' }),
      expect.objectContaining({ gym_id: 'gym-22' })
    ]);
  });
});