"use client"

import { ArrowUpDown } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

import { Actions } from "./actions";
import { z } from "zod";
import { todoResponseSchema } from "@/lib/validation";

type ResponseType = z.infer<typeof todoResponseSchema>;

export const columns: ColumnDef<ResponseType>[] = [
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Título
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    }
  },
  {
    accessorKey: "description",
    header: "Descrição",
  },
  {
    accessorKey: "completed",
    header: "Finalizado"
  },
  {
    id: "actions",
    cell: ({ row }) => <Actions id={row.original.id} />
  },
];