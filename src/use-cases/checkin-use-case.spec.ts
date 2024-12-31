import { describe, it, beforeEach, expect, vi, afterEach } from 'vitest';
import { InMemoryCheckInsRepository } from '../repositories/in-memory/in-memory-checkins-repository';
import { CheckInUseCase } from './checkin-use-case';
import { InMemoryGymRepository } from '../repositories/in-memory/in-memory-gyms-repository';
import { Decimal } from '@prisma/client/runtime/library';
import { MaxNumberOfCheckInsError } from './errors/max-number-of-checkins-error';
import { MaxDistanceError } from './errors/max-distance-error';

let checkinsRepository: InMemoryCheckInsRepository;
let gymsRepository:InMemoryGymRepository;
let sut: CheckInUseCase;

describe('CheckIn Use Case', () => {

  beforeEach(async () => {
    checkinsRepository = new InMemoryCheckInsRepository();
    gymsRepository = new InMemoryGymRepository();
    sut = new CheckInUseCase(checkinsRepository, gymsRepository);

    await gymsRepository.create({
      id:'gym-01',
      title:'smart-fit',
      description:'Bad Gym',
      phone:'35353253',
      latitude:-13.6109358,
      longitude:-42.9346089
    })

    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  })

  it('Should be able to check in', async () => {
    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -13.6109358,
      userLongitude: -42.9346089,
    });
  
    expect(checkIn.id).toEqual(expect.any(String));
  });
  

  it('Should not be able to check in in twice in the same day', async () => {

    vi.setSystemTime(new Date(2022, 0, 20, 8,0,0));

     await sut.execute({
      gymId:'gym-01',
      userId:'user-01',
      userLatitude: -13.6109358,
      userLongitude: -42.9346089,
    });

    await expect(sut.execute({
      gymId:'gym-01',
      userId:'user-01',
      userLatitude: -13.6109358,
      userLongitude: -42.9346089,
    })).rejects.toBeInstanceOf(MaxNumberOfCheckInsError);
  });

  it('Should not be able to check in in twice but in different days', async () => {

    vi.setSystemTime(new Date(2022, 0, 20, 8,0,0));

     await sut.execute({
      gymId:'gym-01',
      userId:'user-01',
      userLatitude: -13.6109358,
      userLongitude: -42.9346089,
    });

    vi.setSystemTime(new Date(2022, 0, 21, 8,0,0));

    const {checkIn} = await sut.execute({
      gymId:'gym-01',
      userId:'user-01',
      userLatitude: -13.6109358,
      userLongitude: -42.9346089,
    })
    
    expect(checkIn.id).toEqual(expect.any(String));
  });

  it('Should not be able to check in on distant gym', async () => {
    gymsRepository.items.push({
      id: 'gym-02',
      title: 'Far Gym',
      phone: '35353253',
      description: 'Very distant gym',
      latitude: new Decimal(-13.770707),
      longitude: new Decimal(-42.7212258),
    });
  
    await expect(sut.execute({
      gymId: 'gym-02', 
      userId: 'user-01',
      userLatitude: -13.6109358,
      userLongitude: -42.9346089,
    })).rejects.toBeInstanceOf(MaxDistanceError);
  });
});