import { Prisma, CheckIn} from "@prisma/client";

export interface CheckInsRepository {
  findByUserIdOnDate(userID:String, date:Date):Promise<CheckIn | null>
  findManyByUserId(userId:string, page:number):Promise<CheckIn[]>
  countByUserId(userId:string):Promise<number>
  create(data:Prisma.CheckInUncheckedCreateInput):Promise<CheckIn>
}