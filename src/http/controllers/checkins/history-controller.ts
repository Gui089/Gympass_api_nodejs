import { z } from "zod";
import { FastifyRequest, FastifyReply } from "fastify";
import { makeFetchUserCheckInUseCase } from "../../../use-cases/factories/make-fetch-user-checkin-use-case";


export async function history(request: FastifyRequest, reply: FastifyReply) {

  const checkInHistoryQuerySchema = z.object({
    page:z.coerce.number().min(1).default(1)
  });

  const { page } = checkInHistoryQuerySchema.parse(request.query);

  const fetchUserCheckInHistoryUseCase = makeFetchUserCheckInUseCase();

  const {checkIns} = await fetchUserCheckInHistoryUseCase.execute({
    userId:request.user.sub,
    page
  });

  return reply.status(201).send({
    checkIns
  });
}