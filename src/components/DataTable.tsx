"use client";

import React from "react";

type Todo = {
  id: string;
  title: string;
  description: string;
  completed: boolean;
};

type DataTableProps = {
  data: Todo[];
};

export default function DataTable({ data }: DataTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              ID
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Título
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Concluído
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((todo) => (
            <tr key={todo.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {todo.id}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {todo.title}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {todo.completed ? "Sim" : "Não"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
