import { expect, describe, it, beforeEach } from 'vitest';
import { compare, hash } from 'bcryptjs';
import { InMemoryUserRepository } from '../repositories/in-memory/in-memory-users-repository';
import { AuthenticateUseCase } from './authenticate-use-case';
import { InvalidCredentialsError } from './errors/invalid-credential-error';

let usersRepository: InMemoryUserRepository;
let sut: AuthenticateUseCase

describe('Authenticate Use Case', () => {

  beforeEach(() => {
    usersRepository = new InMemoryUserRepository;
    sut = new AuthenticateUseCase(usersRepository);
  });

  it('Should br able to autehnticate', async () => {


    await usersRepository.create({
      name: "Jhon doe",
      email: "Jhon@gmail.com",
      password_hash: await hash("321654", 6),
    });

    const { user } = await sut.execute({
      email: "Jhon@gmail.com",
      password: "321654"
    });

    const isPassowrdCorrectlyHashed = await compare("321654", user.password_hash);

    expect(isPassowrdCorrectlyHashed).toBe(true);
  });

  it('Should not be able to authenticate with wrond email', async () => {


    expect(() =>
      sut.execute({
        email: "Jhon@gmail.com",
        password: "321654"
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  });

  it('Should not be able to authenticate with wrond password', async () => {

    await usersRepository.create({
      name: "Jhon doe",
      email: "Jhon@gmail.com",
      password_hash: await hash("321654", 6),
    });

    expect(() =>
      sut.execute({
        email: "Jhon@gmail.com",
        password: "321531"
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  });
});