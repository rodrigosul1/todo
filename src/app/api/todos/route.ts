import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

import { todoSchema } from "@/lib/validation";

// GET: Fetch all todos
export async function GET() {
  const todos = await prisma.todo.findMany();
  return NextResponse.json(todos);
}

// POST: Create a new todo
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = todoSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
    }
    const todo = await prisma.todo.create({
      data: { title: parsed.data.title, description: parsed.data.description },
    });
    return NextResponse.json(todo, { status: 201 });
  } catch (error) {
    console.error("Erro no POST:", error);
    return NextResponse.error();
  }
}
