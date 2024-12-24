import { z } from "zod";
import { FastifyRequest, FastifyReply } from "fastify";
import { RegisterUseCase } from "../../use-cases/register-use-case";
import { PrismaUsersRepository } from "../../repositories/prisma-users-repository";

export async function registerController(request:FastifyRequest, reply:FastifyReply){

    const registerBodySchema = z.object({
        name:z.string(),
        email:z.string().email(),
        password:z.string().min(6)
    });
    
    const {name, email, password} = registerBodySchema.parse(request.body);

    try {
        const prismaUserRepository = new PrismaUsersRepository()
        const registerUseCase = new RegisterUseCase(prismaUserRepository)

        await registerUseCase.execute({name,email,password});
    } catch(err) {
        return reply.status(409).send()
    }
    

    return reply.status(201).send();
}