import { z } from "zod";
import { FastifyRequest, FastifyReply } from "fastify";
import { makeAuthneticateUseCase } from "../../../use-cases/factories/make-authneticate-use-case";
import { InvalidCredentialsError } from "../../../use-cases/errors/invalid-credential-error";


export async function authenticateController(request: FastifyRequest, reply: FastifyReply) {

    const authenticateBodySchema = z.object({
        email: z.string().email(),
        password: z.string().min(6)
    });

    const { email, password } = authenticateBodySchema.parse(request.body);

    try {

        const authenticateUseCase = makeAuthneticateUseCase();

        const { user } = await authenticateUseCase.execute({
            email, password
        });

        const token = await reply.jwtSign(
            {
                role:user.role
            },
            {
                sign: {
                    sub: user.id
                }
            }
        );

        const refreshToken = await reply.jwtSign(
            {
                role:user.role
            },
            {
                sign: {
                    sub: user.id,
                    expiresIn:'7d'
                }
            }
        );

        return reply
          .setCookie('refreshToken', refreshToken, {
            path:'/',
            secure:true,
            sameSite:true,
            httpOnly:true,
          })
          .status(200)
          .send({ token });

    } catch (err) {
        if (err instanceof InvalidCredentialsError) {
            return reply.status(409).send({ message: err.message });
        }

        throw err;
    }
}