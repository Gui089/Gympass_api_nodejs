import { z } from "zod";
import { FastifyRequest, FastifyReply } from "fastify";
import { InvalidCredentialsError } from "../../use-cases/errors/invalid-credential-error";
import { makeAuthneticateUseCase } from "../../use-cases/factories/make-authneticate-use-case";

export async function authenticateController(request:FastifyRequest, reply:FastifyReply){

    const authenticateBodySchema = z.object({
        email:z.string().email(),
        password:z.string().min(6)
    });
    
    const {email, password} = authenticateBodySchema.parse(request.body);

    try {

        const authenticateUseCase = makeAuthneticateUseCase();

        await authenticateUseCase.execute({email,password});
    } catch(err) {
        if(err instanceof InvalidCredentialsError) {
            return reply.status(409).send({message:err.message});
        }

        throw err;
    }
    
    return reply.status(200).send();
}