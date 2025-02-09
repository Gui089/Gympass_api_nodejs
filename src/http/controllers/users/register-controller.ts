import { z } from "zod";
import { FastifyRequest, FastifyReply } from "fastify";
import { makeRegisterUseCase } from "../../../use-cases/factories/make-register-use-case";
import { UserAlreadyExistisError } from "../../../use-cases/errors/user-already-exists";


export async function registerController(request:FastifyRequest, reply:FastifyReply){

    const registerBodySchema = z.object({
        name:z.string(),
        email:z.string().email(),
        password:z.string().min(6)
    });
    
    const {name, email, password} = registerBodySchema.parse(request.body);

    try {
      
        const registerUseCase = makeRegisterUseCase();

        await registerUseCase.execute({name,email,password});
    } catch(err) {
        if(err instanceof UserAlreadyExistisError) {
            return reply.status(409).send({message:err.message});
        }

        throw err;
    }
    

    return reply.status(201).send();
}