"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { userAgentFromString } from "next/server";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { deleteSubject } from "@/lib/actions";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Loading from "@/app/(dashboard)/list/loading";
import { FormContainerProps } from "./FormContainer";

const deleteActionMap= {
  subject: deleteSubject,
  // class: deleteClass,
  // teacher: deleteTeacher,
  // student: deleteStudent,
  // parent: deleteParent,
  // lesson: deleteLesson,
  // exam: deleteExam,
  // assignment: deleteAssignment,
  // result: deleteResult,
  // attendance: deleteAttendance,
  // event: deleteEvent,
  // announcement: deleteAnnouncement,
}

//LAZY LOADING FOR CLIENT COMPONENT
const TeacherForm = dynamic(()=>import("./forms/TeacherForm"), {
  loading: () => <Loading/>,
})
const StudentForm = dynamic(()=>import("./forms/StudentForm"), {
  loading: () => <Loading/>,
})
const SubjectForm = dynamic(()=>import("./forms/SubjectForm"), {
  loading: () => <Loading/>,
})
// const ClassForm = dynamic(()=>import("./forms/ClassForm"), {
//   loading: () => <Loading/>,
// })
// const ExamForm = dynamic(()=>import("./forms/ExamForm"), {
//   loading: () => <Loading/>,
// })

const forms: {
  [key: string]: (setOpen: Dispatch<SetStateAction<boolean>>, type: "create" | "update", data?: any, relatedData?: any) => JSX.Element;
} = {
  teacher: (type, data, setOpen) => <TeacherForm type={type} data={data} setOpen={setOpen} relatedData={relatedData}/>,
  student: (type, data, setOpen) => <StudentForm type={type} data={data} setOpen={setOpen} relatedData={relatedData}/>,
  subject: (setOpen, type, data, relatedData) => <SubjectForm type={type} data={data} setOpen={setOpen} relatedData={relatedData}/>,
  // class: (type, data) => <ClassForm type={type} data={data} />,
  // exam: (type, data) => <ExamForm type={type} data={data} />,
};
const FormModal = ({
  table,
  type,
  data,
  id,
  relatedData
}: FormContainerProps & {relatedData?: any}) => {
  const size = type === "create" ? "w-8 h-8" : "w-7 h-7";

  const bgColor =
    type === "create"
      ? "bg-MySchoolYellow"
      : type === "update"
      ? "bg-MySchoolSky"
      : "bg-MySchoolPurple";

  const [open, setOpen] = useState(false);

  const Form = () => {

    const [state,formAction] = useFormState(deleteActionMap[table], {success:false, error: false})

    const router = useRouter()

    useEffect(()=>{
        if(state.success) {
          toast(`${table} has been deleted`)
          setOpen(false)
          router.refresh()
        }
    })

    return type === "delete" && id ? (
      <form action={formAction} className="p-4 flex flex-col gap-4">
        <input type="text | number" name='id' value={id} hidden/>

        <span className="text-center font-medium">
          Data will be lost. Are you sure you want to delete this {table}?{" "}
        </span>
        <button className="bg-red-700 text-white py-2 px-4 rounded-md border-none w-max self-center">
          Delete
        </button>
      </form>
    ) : type === "create" || type === "update" ? (
      forms[table](setOpen, type, data, relatedData)
    ) : (
      <p>"Form not found"</p>
    );
  };

  return (
    <>
      <button
        className={`${size} flex items-center justify-center rounded-full ${bgColor}`}
        onClick={() => setOpen(true)}
      >
        <Image
          src={`/${type}.png`}
          alt={`/${type} icon`}
          width={16}
          height={16}
        />
      </button>
      {open && (
        <div className="w-screen h-screen absolute left-0 top-0 bg-black bg-opacity-60 z-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-md relative w-[90%] md:w-[70%] lg:w-[60%] lg:w-[50%] xl:w-[50%]">
            <Form />
            <div
              className="absolute top-4 right-4 cursor pointer"
              onClick={() => setOpen(false)}
            >
              <Image src="/close.png" alt="close icon" width={14} height={14} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FormModal;
