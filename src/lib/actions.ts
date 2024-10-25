"use server"

import { revalidatePath } from "next/cache"
import { SubjectSchema, ClassSchema, TeacherSchema } from "./formValidationSchemas"
import prisma from "./prisma"

type CurrentState = {
  success: boolean;
  error: boolean
}

// SUBJECTS

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

// CLASSES

export const createClass = async (currentState: CurrentState, data:ClassSchema)=>{
    // console.log(data.name + " in the server action" )
    try{
        await prisma.class.create({
            data
        })
        // revalidatePath("/list/classes")
        return {success:true, error: false}
    }catch(err){
        console.log(err)
        return {success:false, error: true}
    }
}

export const updateClass = async (currentState: CurrentState, data:ClassSchema)=>{
    // console.log(data.name + " in the server action" )
    try{
        await prisma.class.update({
          where:{
            id:data.id
          },
          data
        })
        // revalidatePath("/list/classes")
        return {success:true, error: false}
    }catch(err){
        console.log(err)
        return {success:false, error: true}
    }
}

export const deleteClass = async (currentState: CurrentState, data:FormData)=>{
    // id can be number or string
    const id = data.get("id") as string
    try{
        await prisma.class.delete({
          where:{
            id:parseInt(id)
          }
        })
        // revalidatePath("/list/classes")
        return {success:true, error: false}
    }catch(err){
        console.log(err)
        return {success:false, error: true}
    }
}
// TEACHERS

export const createTeacher = async (currentState: CurrentState, data:TeacherSchema)=>{
    // console.log(data.name + " in the server action" )
    try{
        await prisma.teacher.create({
            data
        })
        // revalidatePath("/list/teachers")
        return {success:true, error: false}
    }catch(err){
        console.log(err)
        return {success:false, error: true}
    }
}

export const updateTeacher = async (currentState: CurrentState, data:TeacherSchema)=>{
    // console.log(data.name + " in the server action" )
    try{
        await prisma.teacher.update({
          where:{
            id:data.id
          },
          data
        })
        // revalidatePath("/list/teachers")
        return {success:true, error: false}
    }catch(err){
        console.log(err)
        return {success:false, error: true}
    }
}

export const deleteTeacher = async (currentState: CurrentState, data:FormData)=>{
    // id can be number or string
    const id = data.get("id") as string
    try{
        await prisma.teacher.delete({
          where:{
            id:id
          }
        })
        // revalidatePath("/list/teachers")
        return {success:true, error: false}
    }catch(err){
        console.log(err)
        return {success:false, error: true}
    }
}
