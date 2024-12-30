import { Prisma, CheckIn} from "@prisma/client";

export interface CheckInsRepository {
  findByUserIdOnDate(userID:String, date:Date):Promise<CheckIn | null>
  create(data:Prisma.CheckInUncheckedCreateInput):Promise<CheckIn>
}