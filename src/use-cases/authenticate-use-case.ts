
import bcryptjs from "bcryptjs";
import { UsersRepository } from "../repositories/users-repository";
import { InvalidCredentialsError } from "./errors/invalid-credential-error";
import { User } from "@prisma/client";

interface AuthenticateUseCaseRequest {
  email:string;
  password:string;
}

interface AuthenticateUseCaseResponse {
  user:User;
}

export class AuthenticateUseCase {
  constructor(
    private usersRepository:UsersRepository
  ) {
  }

  async execute({
    email,password
  }:AuthenticateUseCaseRequest):Promise<AuthenticateUseCaseResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if(!user) {
      throw new InvalidCredentialsError();
    }

    const doesPasswordMatches = await bcryptjs.compare(password, user.password_hash);

    if(!doesPasswordMatches) {
      throw new InvalidCredentialsError();
    }

    return {
      user,
    }
  }
}