
import { PrismaGymsResporitory } from "../../repositories/prisma/prisma-gyms-repository";
import { CreateGymUseCase } from "../create-gym-use-case";

export function makeCreateGymsUseCase() {
  const gymsRepository = new PrismaGymsResporitory()
  const useCase = new CreateGymUseCase(gymsRepository);

  return useCase;
}