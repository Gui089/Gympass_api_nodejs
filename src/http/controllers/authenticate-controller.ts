import { z } from "zod";
import { FastifyRequest, FastifyReply } from "fastify";
import { PrismaUsersRepository } from "../../repositories/prisma/prisma-users-repository";
import { AuthenticateUseCase } from "../../use-cases/authenticate-use-case";
import { InvalidCredentialsError } from "../../use-cases/errors/invalid-credential-error";

export async function authenticateController(request:FastifyRequest, reply:FastifyReply){

    const authenticateBodySchema = z.object({
        email:z.string().email(),
        password:z.string().min(6)
    });
    
    const {email, password} = authenticateBodySchema.parse(request.body);

    try {
        const prismaUserRepository = new PrismaUsersRepository()
        const authenticateUseCase = new AuthenticateUseCase(prismaUserRepository)

        await authenticateUseCase.execute({email,password});
    } catch(err) {
        if(err instanceof InvalidCredentialsError) {
            return reply.status(409).send({message:err.message});
        }

        throw err;
    }
    
    return reply.status(200).send();
}