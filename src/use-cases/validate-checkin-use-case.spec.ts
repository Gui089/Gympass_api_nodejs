import { describe, it, beforeEach, expect, vi, afterEach } from 'vitest';
import { InMemoryCheckInsRepository } from '../repositories/in-memory/in-memory-checkins-repository';
import { ValidateCheckInUseCase } from './validate-checkin-use-case';
import { ResourceNotFoundError } from './errors/resource-not-found';


let checkinsRepository: InMemoryCheckInsRepository;
let sut: ValidateCheckInUseCase;

describe('ValidateCheckIn Use Case', () => {

  beforeEach(async () => {
    checkinsRepository = new InMemoryCheckInsRepository();
    sut = new ValidateCheckInUseCase(checkinsRepository);

    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  })

  it('Should be able to validate the checkin', async () => {

    const createdCheckIn = await checkinsRepository.create({
      gym_id: 'gym-01',
      user_id: 'user-01'
    });

    const { checkIn } = await sut.execute({
      checkInId: createdCheckIn.id
    });

    expect(checkIn.validated_at).toEqual(expect.any(Date));
    expect(checkinsRepository.items[0].validated_at).toEqual(expect.any(Date));
  });

  it('Should not be able to validate an inexisten checkin', async () => {
    await expect(() =>
      sut.execute({
        checkInId: 'inexistent-check-in-id',
      })).rejects.toBeInstanceOf(ResourceNotFoundError);
  });

  it('should not be able to validate the checkin after 20 minutes of its creation', async () => {
    vi.setSystemTime(new Date(2025, 0, 1, 13, 40));

    const createdCheckIn = await checkinsRepository.create({
      gym_id: 'gym-01',
      user_id: 'user-01'
    });

    const TwentyOneMinutesInMS = 1000 * 60 * 21;

    vi.advanceTimersByTime(TwentyOneMinutesInMS);

    expect(() => sut.execute({
      checkInId: createdCheckIn.id
    })).rejects.toBeInstanceOf(Error);

  });
});