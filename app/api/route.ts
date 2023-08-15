import { redirect } from "next/dist/server/api-utils";
import { NextResponse } from "next/server";
import { UUID, randomUUID } from "crypto";

type todo = {id: string,title: string, description: string, done: boolean}

let todos: todo [] = []

export async function POST(request: Request) {
    const body:{title: string, description: string, done: boolean}  = await request.json();
    todos.push({id:randomUUID(),...body})
    return NextResponse.json(todos);
}

export async function GET(request: Request){
    return NextResponse.json(todos);
}


export async function PUT(request: Request) {
    const body:{id: string}  = await request.json();
    const todo: todo | undefined = todos.find((todo: todo) => todo.id === body.id)
    if(todo) todo.done = true;
    return NextResponse.json(todos);
}

export async function DELETE(request: Request) {
    const body:{id: string}  = await request.json();
    todos = todos.filter((todo: todo) => todo.id !== body.id)
    return NextResponse.json(todos);
}