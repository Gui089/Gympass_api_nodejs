import { Prisma, CheckIn } from "@prisma/client";

import { CheckInsRepository } from "../checkins-repository";
import { randomUUID } from "crypto";
import dayjs from "dayjs";

export class InMemoryCheckInsRepository implements CheckInsRepository {
  
  public items:CheckIn[] = [];

  async findByUserIdOnDate(userID: String, date: Date) {

    const startOfTheDay = dayjs(date).startOf('date');
    const endOfTheDay = dayjs(date).endOf('date');


    const checkInOnSameDate = this.items.find((checkIn) => {
      const checkInDate = dayjs(checkIn.created_at);
      const isOnSameDate = 
         checkInDate.isAfter(startOfTheDay) && checkInDate.isBefore(endOfTheDay);

      return checkIn.user_id === userID && isOnSameDate;
    });

    if(!checkInOnSameDate) {
      return null;
    }

    return checkInOnSameDate;
  }

  async create(data: Prisma.CheckInUncheckedCreateInput) {
    const checkin = {
      id: randomUUID(),
      user_id:data.user_id,
      gym_id:data.gym_id,
      validated_at:data.validated_at ? new Date(data.validated_at): null,
      created_at:new Date()
    }

    this.items.push(checkin);

    return checkin;
  }
}