import { expect, test, describe, it } from 'vitest';
import { RegisterUseCase } from './register-use-case';
import { compare } from 'bcryptjs';
import { InMemoryUserRepository } from '../repositories/in-memory/in-memory-users-repository';
import { UserAlreadyExistisError } from './errors/user-already-exists';

describe('Register Use Case', () => {
    it('Should hash user password upon registration', async () => {
        const usersRepository = new InMemoryUserRepository();
        const registerUseCase = new RegisterUseCase(usersRepository);

        const { user } = await registerUseCase.execute({
            name: "Jhon Doe",
            email: "Jhon@gmail.com",
            password: "321654"
        });

        const isPassowrdCorrectlyHashed = await compare("321654", user.password_hash);

        expect(isPassowrdCorrectlyHashed).toBe(true);
    });


    it('Should not be able to register with same email twice', async () => {
        const usersRepository = new InMemoryUserRepository();
        const registerUseCase = new RegisterUseCase(usersRepository);

        const email = 'Jhon@gmail.com';

        await registerUseCase.execute({
            name: "Jhon Doe",
            email,
            password: "321654"
        });

        await expect(() => registerUseCase.execute({
            name: "Jhon Doe",
            email,
            password: "321654"
        }),
        ).rejects.toBeInstanceOf(UserAlreadyExistisError);
    });
});