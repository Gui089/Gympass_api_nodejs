import { PrismaCheckInsRepository } from "../../repositories/prisma/prisma-checkins-repository";
import { GetUserMetricsUseCase } from "../get-user-metrics-use-case";

export function makeGetUserMetricsUseCase() {
  const checkinsRepository = new PrismaCheckInsRepository()
  const useCase = new GetUserMetricsUseCase(checkinsRepository);

  return useCase;
}