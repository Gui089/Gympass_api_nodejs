import { CheckIn } from "@prisma/client";
import { CheckInsRepository } from "../repositories/checkins-repository";

interface FetchUseCaseRequest{
  userId:string;
  page:number;
}

interface FetchUseCaseResponse {
  checkIns:CheckIn[];
}

export class FetchCheckInUseCase {
  constructor(
    private checkInsRepository:CheckInsRepository
  ) {

  }

  async execute({
    userId,
    page
  }:FetchUseCaseRequest):Promise<FetchUseCaseResponse> {
    const checkIns = await this.checkInsRepository.findManyByUserId(userId, page);

    return {
      checkIns,
    }
  }
}