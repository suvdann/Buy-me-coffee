import { Request, Response } from "express";
import { prisma } from "../../utils/prisma";

export const BankCardController=async(req:Request,res:Response)=>{
const {country,cardNumber,expiryDate,firstName,lastName}=req.body

try{ 
     const userId = res.locals.userId;
     console.log(userId,"easdtfyguhijugfdfghjhg")
// const isUserExisted=await prisma.user.findUnique({where:{userId}})
// if(isUserExisted){
const BankCard=await prisma.bankCard.create({
    data:{
       country:country,cardNumber:cardNumber,expiryDate:expiryDate,firstName:firstName,lastName:lastName, userId:userId
    }

})
res.status(200).send({ message: "Bank created successfully", BankCard });
// }
//  const userId = res.locals.userId; 


}catch(err){
    console.error("Bank Card creation error:", err);
    res.status(500).send({ message: "Server error" });
}
}