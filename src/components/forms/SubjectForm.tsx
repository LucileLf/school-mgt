"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import InputField from "../InputField";
import { SubjectSchema, subjectSchema } from "@/lib/formValidationSchemas";
import { createSubject, updateSubject } from "@/lib/actions";
import { useFormState } from "react-dom";
import { Dispatch, SetStateAction, useEffect } from "react";
import { toast } from 'react-toastify';
import { useRouter } from "next/navigation";


const SubjectForm = ({
  type,
  data,
  setOpen
}: {
  type: "create" | "update";
  data?: any;
  setOpen: Dispatch<SetStateAction<boolean>>
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SubjectSchema>({
    resolver: zodResolver(subjectSchema),
  });

  // USEACTIONSTATE ONLY AFTER REACT 19
  const [state, formAction] = useFormState(type === "create" ? createSubject : updateSubject, {success:false, error:false});

  const onSubmit = handleSubmit((data) => {
    // console.log(data);
    formAction(data);
  });

  const router = useRouter()

  useEffect(()=>{
      if(state.success) {
        toast(`Subject has been ${type === "create" ? "created" : "updated"}`)
        setOpen(false)
        router.refresh()
      }
  })

  return (
    <form className="flex flex-col gap-8 " onSubmit={onSubmit}>
      <h1 className="text-xl font-semibold">
        {type === "create" ? "Create a new subject" : `Update ${data?.name}`}
      </h1>
      {/* {`Update ${data?.name}`} */}
      <div className="flex justify-between flex-wrap gap-4">
        <InputField
          label="Subject name"
          name="name"
          defaultValue={data?.name}
          register={register}
          error={errors?.name}
        />
      </div>
      {state.error && <span className="text-red-500">Something went wrong!</span> }

      <button className="bg-blue-400 text-white p-2 rounded-md">
        {type === "create" ? "Create" : "Update"}
      </button>
    </form>
  );
};

export default SubjectForm;
