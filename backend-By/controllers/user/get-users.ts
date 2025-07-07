import { Request, Response } from "express";
import { prisma } from "../../utils/prisma"

export const getUsers=async(_req:Request,res:Response)=>{
    try{

    const allUsers=await prisma.profile.findMany();
    res.send({user:allUsers})
    }catch(err){
        res.status(400).send({message:"database holboltond aldaa garlaa"})
    }
}