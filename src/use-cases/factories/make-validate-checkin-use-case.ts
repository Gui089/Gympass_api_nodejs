import { PrismaCheckInsRepository } from "../../repositories/prisma/prisma-checkins-repository";
import { ValidateCheckInUseCase } from "../validate-checkin-use-case";

export function makeValidateCheckInUseCase() {
  const checkinsRepository = new PrismaCheckInsRepository()
  const useCase = new ValidateCheckInUseCase(checkinsRepository);

  return useCase;
}