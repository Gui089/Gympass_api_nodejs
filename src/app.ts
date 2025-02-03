import fastify, { FastifyBaseLogger, FastifyInstance, FastifyPluginOptions, FastifyTypeProvider, RawServerDefault } from "fastify";
import { ZodError } from "zod";
import { env } from "./env";
import fastifyJwt from "@fastify/jwt";
import { userRoutes } from "./http/controllers/users/routes";
import { gymsRoutes } from "./http/controllers/gyms/routes";
import { IncomingMessage, ServerResponse } from "http";
import { checkInRoutes } from "./http/controllers/checkins/routes";
import fastifyCookie from "@fastify/cookie";

export const app = fastify();

app.register(fastifyJwt, {
    secret:env.JWT_SCRET,
    cookie:{
        cookieName:'refreshToken',
        signed:false
    },
    sign:{
        expiresIn:'10m',
    }
});

app.register(fastifyCookie);
app.register(userRoutes);
app.register(gymsRoutes);
app.register(checkInRoutes);

app.setErrorHandler((error, _, reply) => {
    if(error instanceof ZodError) {
        return reply
           .status(400)
           .send({message:"validation error.", issues:error.format})
    }

    if(env.NODE_ENV !== 'production') {
        console.error(error);
    } else {
        //TODO: Here we should log to an external tool like DataDog...
    }

    return reply.status(500).send({message:"Internal server error"});
});

function routes(instance: FastifyInstance<RawServerDefault, IncomingMessage, ServerResponse<IncomingMessage>, FastifyBaseLogger, FastifyTypeProvider>, opts: FastifyPluginOptions, done: (err?: Error | undefined) => void): void {
    throw new Error("Function not implemented.");
}
