import { PrismaCheckInsRepository } from "../../repositories/prisma/prisma-checkins-repository";
import { PrismaGymsResporitory } from "../../repositories/prisma/prisma-gyms-repository";
import { CheckInUseCase } from "../checkin-use-case";

export function makeCheckInUseCase() {
  const checkinsRepository = new PrismaCheckInsRepository()
  const gymsRepository = new PrismaGymsResporitory();
  const useCase = new CheckInUseCase(checkinsRepository, gymsRepository);

  return useCase;
}