'use client';

import { useEffect, useState } from "react";

type todo = {id: string, title: string, description: string, done: boolean};

async function getData() {
  const res = await fetch('http://localhost:3000/api/')
  if (!res.ok) {
    return [];
  }
 
  return res.json()
}

export default function Home() {

  const [todos,setTodos]= useState<todo[]>([])

  useEffect(() =>  {
    getData().then( (res:todo[] )=> {
      setTodos(res)
    })
  },[])

  const  submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formdata = new FormData(e.currentTarget);
    const res = await fetch("http://localhost:3000/api", {
      method: 'POST',
      headers: {
        accept: "application/json",
        "content-type": "application/json"
      },
      body: JSON.stringify({title:formdata.get("title"), description: formdata.get("description"), done: false})
    });
    const data = await res.json();
    (e.target as HTMLFormElement).reset();
    setTodos(data)
  }

  const done = async (id: string) => {
    const res = await fetch("http://localhost:3000/api", {
      method: 'PUT',
      headers: {
        accept: "application/json",
        "content-type": "application/json"
      },
      body: JSON.stringify({id})
    });
    const data = await res.json();
    setTodos(data)
  }

  const remove = async (id: string) => {
    const res = await fetch("http://localhost:3000/api", {
      method: 'DELETE',
      headers: {
        accept: "application/json",
        "content-type": "application/json"
      },
      body: JSON.stringify({id})
    });
    const data = await res.json();
    setTodos(data)
  }

  return (
    <main className="flex min-h-screen flex-col text-sm md:p-24 p-10">
      <h1 className="text-xl font-black">TODO</h1>
      <form onSubmit={submit} className="flex flex-col gap-3 md:w-1/2 w-full">
        <p className="font-bold mt-3">New Todo</p>
        <div className=" flex flex-col">
          <label htmlFor="title">Title</label>
          <input required className="p-1.5 border border-black rounded-md" type="text" id="title" name="title" />
        </div>
        <div className=" flex flex-col">
          <label htmlFor="description">Description</label>
          <textarea required className="p-1.5 border border-black rounded-md" id="description" name="description" />
        </div>
        <button type="submit" className="float-right bg-blue-500 rounded-md text-white py-2 px-4 w-max">Create</button>
      </form>

      <div  className="w-full flex flex-col gap-2 md:w-1/2 ">
        <p className="my-4 font-bold">TODO LIST</p>
        {todos.map((todo: todo)  => (
          <div key={todo.id} className={`w-full overflow-hidden rounded-md p-3 flex flex-col  items-start ${todo.done ? "bg-green-300": "bg-gray-200"}`}>
            <p className="font-bold">{todo.title}</p>
            <div className="w-full overflow-hidden text-ellipsis">{todo.description}</div>
            <div className="flex gap-1 text-xs mt-1">
              {!todo.done && <button className="p-1 px-2 bg-green-600 rounded-md text-white" onClick={() => done(todo.id)}>Done</button>}
              <button className="p-1 px-2 bg-red-600 rounded-md text-white" onClick={() => remove(todo.id)}>Remove</button>
            </div>
          </div>
        ))}
      </div>
      
    </main>
  )
}
