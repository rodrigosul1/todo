"use client";

import { Edit, MoreHorizontal, Trash } from "lucide-react";
import { useRouter } from "next/navigation";

import { useConfirm } from "@/hooks/use-confirm";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Props = {
    id: string;
};

export const Actions = ({ id }: Props) => {
    const router = useRouter();
    const [ConfirmDialog, confirm] = useConfirm(
        "Apagar TODO",
        "Tem certeza que deseja apagar este TODO? Esta ação não pode ser desfeita."
    );

    const handleDelete = async () => {
        const ok = await confirm();

        if (ok) {
            try {
                await fetch(`/api/todos/${id}`, {
                    method: 'DELETE',
                });
                router.refresh();
            } catch (error) {
                console.error('Error deleting todo:', error);
            }
        }
    }

    const handleEdit = async () => {
        // TODO: Implement edit functionality
        console.log('Edit todo:', id);
    }

    return (
        <>
            <ConfirmDialog />
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="size-8 p-0">
                        <MoreHorizontal className="size-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={handleEdit}>
                        <Edit className="size-4 mr-2" />
                        Editar
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleDelete}>
                        <Trash className="size-4 mr-2" />
                        Apagar
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    );
};
