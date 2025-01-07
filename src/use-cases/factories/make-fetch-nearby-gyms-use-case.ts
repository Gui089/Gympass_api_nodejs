
import { PrismaGymsResporitory } from "../../repositories/prisma/prisma-gyms-repository";
import { FetchNearbyUseCase } from "../fetch-nearby-gyms-use-case";


export function makeFetchNearbyGymsUseCase() {
  const gymsRepository = new PrismaGymsResporitory()
  const useCase = new FetchNearbyUseCase(gymsRepository);

  return useCase;
}