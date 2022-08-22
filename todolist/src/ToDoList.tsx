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
}

function ToDoList(){
  const {register, handleSubmit, formState:{errors}} = useForm<IForm>({
    defaultValues:{
      email:"@naver.com",
    }
  });
  const onValid = (data:any) => {
    console.log(data);
  }  

  return (
    <div>
      <form style={{display:"flex", flexDirection: "column"}} onSubmit={handleSubmit(onValid)}>
        <input {...register("email",{required: "email required", 
        pattern: {
          value: /^[A-Za-z0-9._%+-]+@naver.com$/,
          message: "Only naver.com emails allowed",
        },
        })} placeholder="Email" />
        <span>
          {errors?.email?.message}
        </span>
        <input {...register("first_name",{required: "First Name is required"})} placeholder="First Name" />
        <span>
          {errors?.first_name?.message}
        </span>
        <input {...register("last_name",{required: "Last Name is required"})} placeholder="Last Name" />
        <span>
          {errors?.last_name?.message}
        </span>
        <input {...register("username",{required: "username is required", minLength:10})} placeholder="Username" />
        <span>
          {errors?.username?.message}
        </span>
        <input {...register("password",{required: "Password is required", minLength:{
          value: 5,
          message: "Your password is too short.",
        }})} placeholder="Password" />
          <span>
          {errors?.password?.message}
        </span>
        <input {...register("password1",{required: "Password is required", minLength:5})} placeholder="Password1" />
        <span>
          {errors?.password1?.message}
        </span>
        <button>Add</button>
      </form>
    </div>
  );
}

export default ToDoList;