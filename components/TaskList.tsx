"use client";

import { Task } from "@/types";
import { Check, Trash2, AlertCircle, ArrowUp, ArrowRight } from "lucide-react";

interface TaskListProps {
  tasks: Task[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function TaskList({ tasks, onToggle, onDelete }: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        <AlertCircle className="w-12 h-12 mx-auto mb-3 opacity-50" />
        <p>No tasks yet. Submit a transcript to generate action items.</p>
      </div>
    );
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200";
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "low":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getPriorityIcon = (priority: string) => {
    if (priority === "high") return <ArrowUp className="w-3 h-3" />;
    return <ArrowRight className="w-3 h-3" />;
  };

  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <div
          key={task._id}
          className={`p-4 rounded-lg border-2 transition-all ${
            task.status === "completed"
              ? "bg-gray-50 border-gray-200 opacity-75"
              : "bg-white border-gray-200 hover:border-indigo-300"
          }`}
        >
          <div className="flex items-start gap-3">
            <button
              onClick={() => onToggle(task._id)}
              className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                task.status === "completed"
                  ? "bg-green-500 border-green-500"
                  : "border-gray-300 hover:border-indigo-500"
              }`}
            >
              {task.status === "completed" && <Check className="w-4 h-4 text-white" />}
            </button>
            
            <div className="flex-grow">
              <p
                className={`text-gray-900 ${
                  task.status === "completed" ? "line-through text-gray-500" : ""
                }`}
              >
                {task.text}
              </p>
              <div className="flex items-center gap-2 mt-2">
                <span
                  className={`text-xs font-medium px-2 py-1 rounded border flex items-center gap-1 ${getPriorityColor(
                    task.priority
                  )}`}
                >
                  {getPriorityIcon(task.priority)}
                  {task.priority.toUpperCase()}
                </span>
                {task.createdAt && (
                  <span className="text-xs text-gray-500">
                    {new Date(task.createdAt).toLocaleDateString()}
                  </span>
                )}
                {task.tags && task.tags.length > 0 && (
                  <span className="text-xs text-indigo-600 font-medium">
                    {task.tags.join(", ")}
                  </span>
                )}
              </div>
            </div>
            
            <button
              onClick={() => onDelete(task._id)}
              className="flex-shrink-0 text-gray-400 hover:text-red-600 transition-colors"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
