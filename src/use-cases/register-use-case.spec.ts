import { expect, test, describe, it, beforeEach } from 'vitest';
import { RegisterUseCase } from './register-use-case';
import { compare } from 'bcryptjs';
import { InMemoryUserRepository } from '../repositories/in-memory/in-memory-users-repository';
import { UserAlreadyExistisError } from './errors/user-already-exists';

//const usersRepository = new InMemoryUserRepository();
//const registerUseCase = new RegisterUseCase(usersRepository);

let usersRepository: InMemoryUserRepository;
let sut: RegisterUseCase;

describe('Register Use Case', () => {

    beforeEach(() => {
        usersRepository = new InMemoryUserRepository;
        sut = new RegisterUseCase(usersRepository);
    });

    it('Should hash user password upon registration', async () => {


        const { user } = await sut.execute({
            name: "Jhon Doe",
            email: "Jhon@gmail.com",
            password: "321654"
        });

        const isPassowrdCorrectlyHashed = await compare("321654", user.password_hash);

        expect(isPassowrdCorrectlyHashed).toBe(true);
    });


    it('Should not be able to register with same email twice', async () => {


        const email = 'Jhon@gmail.com';

        await sut.execute({
            name: "Jhon Doe",
            email,
            password: "321654"
        });

        await expect(() => sut.execute({
            name: "Jhon Doe",
            email,
            password: "321654"
        }),
        ).rejects.toBeInstanceOf(UserAlreadyExistisError);
    });
});