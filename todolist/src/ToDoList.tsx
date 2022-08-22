import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { errorSelector } from "recoil";

/* function ToDoList(){
  const [toDo, setToDo] = useState("");
  const [toDoError, setToDoError] = useState("");
  const onChange = (event:React.FormEvent<HTMLInputElement>) => {
    const{
      currentTarget: {value},
    } = event;
    setToDoError("");
    setToDo(value);
  }
  const onSubmit = (event:React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if(toDo.length < 10){
      return setToDoError("To do should be longer");
    }
    console.log("submit");
  }
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input onChange={onChange} value={toDo} type="text" placeholder="Write a to do" />
        <button>Add</button>
        {toDoError !== "" ? toDoError : null}
      </form>
    </div>
  );
} */

interface IForm {
  email: string;
  first_name: string;
  last_name: string;
  username: string;
  password: string;
  password1: string;
  extraError?:string;
}

function ToDoList(){
  const {register, handleSubmit, formState:{errors}, setError} = useForm<IForm>({
    defaultValues:{
      email:"@naver.com",
    }
  });
  const onValid = (data:IForm) => {
    if(data.password !== data.password1){
      setError("password1",
      {message:"Password are not the same"},
      {shouldFocus:true}
      )
    }
    // setError("extraError",{message:"Server offline."})
  }  
  console.log(errors);
  
  return (
    <div>
      <form style={{display:"flex", flexDirection: "column"}} onSubmit={handleSubmit(onValid)}>
        {/* email */}
        <input {...register("email",{required: "email required", 
        pattern: {
          value: /^[A-Za-z0-9._%+-]+@naver.com$/,
          message: "Only naver.com emails allowed",
        },
        })} 
        placeholder="Email" 
        />
        <span>
          {errors?.email?.message}
        </span>
        {/* First Name */}
        <input 
          {...register("first_name",{
              required: "First Name is required", 
              validate:{
                noNico: (value) => value.includes("nico") ? "nicos are not allowed" : true,
                noNick: (value) => value.includes("nick") ? "nicks are not allowed" : true,
            }
          })} 
          placeholder="First Name" 
          />
        <span>
          {errors?.first_name?.message}
        </span>
        {/* Last Name */}
        <input {...register("last_name",{required: "Last Name is required"})} placeholder="Last Name" />
        <span>
          {errors?.last_name?.message}
        </span>
        {/* username */}
        <input {...register("username",{required: "username is required", minLength:5})} placeholder="Username" />
        <span>
          {errors?.username?.message}
        </span>
        {/* password */}
        <input {...register("password",{required: "Password is required", minLength:{
          value: 5,
          message: "Your password is too short.",
        }})} placeholder="Password" />
          <span>
          {errors?.password?.message}
        </span>
        {/* password check */}
        <input {...register("password1",{required: "Password is required", minLength:5})} placeholder="Password1" />
        <span>
          {errors?.password1?.message}
        </span>
        <button>Add</button>
        { /* 물음표를 붙이면, 그 항목이 undefined면 그 뒤를 실행하지 않음  */ }
        <span>{errors?.extraError?.message}</span>
      </form>
    </div>
  );
}

export default ToDoList;