import { expect, describe, it, beforeEach } from 'vitest';
import { hash } from 'bcryptjs';
import { InMemoryUserRepository } from '../repositories/in-memory/in-memory-users-repository';
import { GetUserProfileUseCase } from './get-user-profile-use-case';
import { ResourceNotFoundError } from './errors/resource-not-found';

let usersRepository: InMemoryUserRepository;
let sut: GetUserProfileUseCase;

describe('Get user profile Use Case', () => {

  beforeEach(() => {
    usersRepository = new InMemoryUserRepository;
    sut = new GetUserProfileUseCase(usersRepository);
  });

  it('Should be able to get user profile', async () => {

    const createdUser = await usersRepository.create({
      name: "Jhon doe",
      email: "Jhon@gmail.com",
      password_hash: await hash("321654", 6),
    });

    const { user } = await sut.execute({
      userId: createdUser.id
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it('Should not be able to get user profile with wrong id', async () => {


    expect(() =>
      sut.execute({
        userId:"Not-exists id"
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  });
});