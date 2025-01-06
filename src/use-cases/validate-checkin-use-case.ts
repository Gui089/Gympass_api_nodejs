import { CheckIn } from "@prisma/client";
import { CheckInsRepository } from "../repositories/checkins-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found";
import dayjs from "dayjs";


interface ValidateCheckInUseCaseRequest{
  checkInId:string;
}

interface ValidateCheckInUseCaseResponse {
  checkIn:CheckIn;
}

export class ValidateCheckInUseCase {
  constructor(
    private checkInsRepository:CheckInsRepository,
  ) {

  }

  async execute({
    checkInId
  }:ValidateCheckInUseCaseRequest):Promise<ValidateCheckInUseCaseResponse> {
    const checkIn = await this.checkInsRepository.findById(checkInId);

    if(!checkIn) {
      throw new ResourceNotFoundError();
    }

    checkIn.validated_at = new Date();

    const distanceInMinutesFromCheckInCreation = dayjs(new Date()).diff(
      checkIn.created_at,
      'minutes'
    );

    if(distanceInMinutesFromCheckInCreation > 20)  {
       throw new Error();
    }

    await this.checkInsRepository.save(checkIn);

    return {
      checkIn,
    }
  }
}
