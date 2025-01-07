
import { PrismaGymsResporitory } from "../../repositories/prisma/prisma-gyms-repository";
import { SearchGymsUseCase } from "../search-gyms-use-case";

export function makeSearchGymsUseCase() {
  const gymsRepository = new PrismaGymsResporitory()
  const useCase = new SearchGymsUseCase(gymsRepository);

  return useCase;
}