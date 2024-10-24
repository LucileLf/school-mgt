"use server"

import { revalidatePath } from "next/cache"
import { SubjectSchema } from "./formValidationSchemas"
import prisma from "./prisma"

type CurrentState = {
  success: boolean;
  error: boolean
}

export const createSubject = async (currentState: CurrentState, data:SubjectSchema)=>{
    // console.log(data.name + " in the server action" )
    try{
        await prisma.subject.create({
            data:{
                name:data.name,
                teachers:{
                  connect:data.teachers.map(teacherId=>({id:teacherId}))
                }
            }
        })
        // revalidatePath("/list/subjects")
        return {success:true, error: false}
    }catch(err){
        console.log(err)
        return {success:false, error: true}
    }
}

export const updateSubject = async (currentState: CurrentState, data:SubjectSchema)=>{
    // console.log(data.name + " in the server action" )
    try{
        await prisma.subject.update({
          where:{
            id:data.id
          },
          data:{
                name:data.name,
                teachers:{
                  set:data.teachers.map((teacherId)=>({id:teacherId}))
                }
            }
        })
        // revalidatePath("/list/subjects")
        return {success:true, error: false}
    }catch(err){
        console.log(err)
        return {success:false, error: true}
    }
}

export const deleteSubject = async (currentState: CurrentState, data:FormData)=>{
    // id can be number or string
    const id = data.get("id") as string
    try{
        await prisma.subject.delete({
          where:{
            id:parseInt(id)
          }
        })
        // revalidatePath("/list/subjects")
        return {success:true, error: false}
    }catch(err){
        console.log(err)
        return {success:false, error: true}
    }
}