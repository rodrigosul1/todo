import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// PUT: Update a Todo
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    
    const updatedTodo = await prisma.todo.update({
      where: { id: params.id },
      data: {
        title: body.title,
        completed: body.completed,
        tags: {
          // Para conectar etiquetas já existentes:
          connect: body.existingTags ? body.existingTags.map((tagId: string) => ({ id: tagId })) : [],
          // Para criar novas etiquetas:
          create: body.newTags ? body.newTags.map((name: string) => ({ name })) : [],
        },
      },      
    });
    return NextResponse.json(updatedTodo);
  } catch (error) {
    console.error("Erro no PUT:", error);
    return NextResponse.error();
  }
}

// DELETE: Delete a Todo
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const deletedTodo = await prisma.todo.delete({
      where: { id: params.id },
    });
    return NextResponse.json(deletedTodo);
  } catch (error) {
    console.error("Erro no DELETE:", error);
    return NextResponse.error();
  }
}
