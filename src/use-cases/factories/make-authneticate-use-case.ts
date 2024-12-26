import { PrismaUsersRepository } from "../../repositories/prisma/prisma-users-repository"
import { AuthenticateUseCase } from "../authenticate-use-case";

export function makeAuthneticateUseCase() {
  const prismaUserRepository = new PrismaUsersRepository();
  const authenticateUseCase = new AuthenticateUseCase(prismaUserRepository);

  return authenticateUseCase;
}
