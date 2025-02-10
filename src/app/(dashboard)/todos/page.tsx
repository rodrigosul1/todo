"use client"
import React from "react";
import { Loader2, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/data-table";
import { 
    Card,
    CardContent,
    CardHeader,
    CardTitle,
 } from "@/components/ui/card"

import { columns } from "./columns";
import { Skeleton } from "@/components/ui/skeleton";

const TodosPage = () => {
    const [isLoading, setIsLoading] = React.useState(true);
    const [todos, setTodos] = React.useState([]);

    React.useEffect(() => {
        const fetchTodos = async () => {
            try {
                const res = await fetch("/api/todos");
                const data = await res.json();
                setTodos(data);
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching todos:", error);
                setIsLoading(false);
            }
        };

        fetchTodos();
    }, []);

    if (isLoading) {
        return(
            <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
                <Card className="border-none drop-shadow-sm">
                    <CardHeader>
                        <Skeleton className="h-8 w-48"/>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[500px] w-full flex items-center justify-center">
                            <Loader2 className="size-6 text-slate-300 animate-spin" />
                        </div>
                    </CardContent>
                </Card>
            </div>
        )
    }

    return ( 
        <div className="max-w-screen-2xl mx-auto w-full">
            <Card className="border-none drop-shadow-sm">
                <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
                    <CardTitle className="text-xl line-clamp-1">
                        Tarefas
                    </CardTitle>
                    <Button onClick={() => {}} size="sm">
                        <Plus className="size-4 mr-2" />
                        Adicionar
                    </Button>
                </CardHeader>
                <CardContent>
                    <DataTable
                        filterKey="title"
                        columns={columns}
                        data={todos}
                        onDelete={async (rows) => {
                            try {
                                await Promise.all(
                                    rows.map((row) => 
                                        fetch(`/api/todos/${row.original.id}`, {
                                            method: 'DELETE'
                                        })
                                    )
                                );
                                const res = await fetch("/api/todos");
                                const newTodos = await res.json();
                                setTodos(newTodos);
                            } catch (error) {
                                console.error("Error deleting todos:", error);
                            }
                        }}
                        disabled={isLoading}
                    />
                </CardContent>
            </Card>
        </div>
    );
};

export default TodosPage;