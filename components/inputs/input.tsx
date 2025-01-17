"use client"

import { FC, InputHTMLAttributes } from "react"
import { BiDollar } from "react-icons/bi"

import { cn } from "@/lib/utils"
// import { InputTypes } from "./type"
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form"

declare type InputTypes = {
   id: string
   label: string
   type?: InputHTMLAttributes<HTMLInputElement>["type"]
   disabled?: boolean
   formatPrice?: boolean
   required?: boolean
   register: UseFormRegister<FieldValues>
   errors: FieldErrors
}

export const Input: FC<InputTypes> = ({
   id,
   label,
   type = "text",
   disabled,
   formatPrice,
   register,
   required,
   errors,
}) => {
   return (
      <div className="relative w-full mb-4">
         {formatPrice && (
            <div className="absolute text-neutral-700 top-5 left-2">
               <BiDollar size={24} />
            </div>
         )}
         <input
            id={id}
            disabled={disabled}
            {...register(id, { required })}
            placeholder=" "
            type={type}
            className={cn(
               "peer w-full p-4 pt-6 font-light bg-white border-2 rounded-md outline-none transition disabled:opacity-70 disabled:cursor-not-allowed",
               formatPrice ? "pl-9" : "pl-4",
               errors[id]
                  ? "border-rose-500 focus:border-rose-500"
                  : "border-neutral-300 focus:border-black"
            )}
         />
         <label
            htmlFor={id}
            className={cn(
               "absolute text-md duration-150 transform -translate-y-3 top-5 z-10 origin-[0]",
               formatPrice ? "left-9" : "left-4",
               "peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4",
               errors[id] ? "text-rose-500" : "text-zinc-400"
            )}
         >
            {label}
         </label>
      </div>
   )
}