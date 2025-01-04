import { Prisma, CheckIn} from "@prisma/client";

export interface CheckInsRepository {
  findByUserIdOnDate(userID:String, date:Date):Promise<CheckIn | null>
  findManyByUserId(userId:string, page:number):Promise<CheckIn[]>
  create(data:Prisma.CheckInUncheckedCreateInput):Promise<CheckIn>
}