import { PrismaCheckInsRepository } from "../../repositories/prisma/prisma-checkins-repository";
import { FetchCheckInUseCase } from "../fetch-user-checkin-history-use-case";

export function makeFetchUserCheckInUseCase() {
  const checkinsRepository = new PrismaCheckInsRepository()
  const useCase = new FetchCheckInUseCase(checkinsRepository);

  return useCase;
}