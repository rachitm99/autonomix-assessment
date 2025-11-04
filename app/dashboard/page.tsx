"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Sparkles, BarChart3, LogOut } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { taskAPI } from "@/lib/api";
import TranscriptForm from "@/components/TranscriptForm";
import TaskList from "@/components/TaskList";
import ProgressChart from "@/components/ProgressChart";
import PriorityChart from "@/components/PriorityChart";

interface Task {
  _id: string;
  text: string;
  status: "pending" | "completed";
  priority: "high" | "medium" | "low";
  tags?: string[];
}

export default function Dashboard() {
  const router = useRouter();
  const { user, logout } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [filterStatus, setFilterStatus] = useState<"all" | "pending" | "completed">("all");
  const [filterPriority, setFilterPriority] = useState<"all" | "high" | "medium" | "low">("all");

  // Redirect if not authenticated
  useEffect(() => {
    if (!user) {
      router.push("/login");
    } else {
      // Load tasks when user is authenticated
      loadTasks();
    }
  }, [user, router]);

  const loadTasks = async () => {
    try {
      const data = await taskAPI.getTasks();
      setTasks(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error loading tasks:", error);
      setTasks([]);
    }
  };

  const handleTranscriptSubmit = async (transcript: string) => {
    setLoading(true);
    try {
      const newTasks = await taskAPI.generateTasks(transcript);
      if (Array.isArray(newTasks)) {
        setTasks((prev) => [...prev, ...newTasks]);
      }
    } catch (error: any) {
      console.error("Error generating tasks:", error);
      alert(error.response?.data?.error || "Failed to generate tasks. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleToggleTask = async (id: string) => {
    const task = tasks.find((t) => t._id === id);
    if (!task) return;

    const newStatus = task.status === "pending" ? "completed" : "pending";
    
    try {
      await taskAPI.updateTask(id, { status: newStatus });
      setTasks((prev) =>
        prev.map((t) => (t._id === id ? { ...t, status: newStatus } : t))
      );
    } catch (error) {
      console.error("Error updating task:", error);
      alert("Failed to update task");
    }
  };

  const handleDeleteTask = async (id: string) => {
    try {
      await taskAPI.deleteTask(id);
      setTasks((prev) => prev.filter((t) => t._id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
      alert("Failed to delete task");
    }
  };

  const handleClearAll = async () => {
    if (confirm("Are you sure you want to delete all tasks?")) {
      try {
        await Promise.all(tasks.map((task) => taskAPI.deleteTask(task._id)));
        setTasks([]);
      } catch (error) {
        console.error("Error clearing tasks:", error);
        alert("Failed to clear all tasks");
      }
    }
  };

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  // Filter tasks
  const filteredTasks = tasks.filter((task) => {
    const matchesStatus = filterStatus === "all" || task.status === filterStatus;
    const matchesPriority = filterPriority === "all" || task.priority === filterPriority;
    return matchesStatus && matchesPriority;
  });

  const completedCount = tasks.filter((t) => t.status === "completed").length;
  const pendingCount = tasks.filter((t) => t.status === "pending").length;

  if (!user) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Sparkles className="w-10 h-10 text-indigo-600" />
              <div>
                <h1 className="text-4xl font-bold text-gray-900">InsightBoard AI</h1>
                <p className="text-gray-600 text-sm mt-1">Welcome back, {user.name}!</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-white text-gray-700 rounded-lg hover:bg-gray-50 border border-gray-300 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </header>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Transcript Form */}
          <div className="lg:col-span-1">
            <TranscriptForm onSubmit={handleTranscriptSubmit} loading={loading} />
          </div>

          {/* Right Column - Tasks and Charts */}
          <div className="lg:col-span-2 space-y-6">
            {/* Charts Section */}
            {tasks.length > 0 && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center gap-2 mb-4">
                  <BarChart3 className="w-5 h-5 text-indigo-600" />
                  <h2 className="text-xl font-semibold text-gray-900">Analytics</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <ProgressChart completed={completedCount} pending={pendingCount} />
                  <PriorityChart tasks={tasks} />
                </div>
              </div>
            )}

            {/* Task List Section */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">
                  Action Items ({filteredTasks.length})
                </h2>
                {tasks.length > 0 && (
                  <button
                    onClick={handleClearAll}
                    className="text-sm text-red-600 hover:text-red-700 font-medium"
                  >
                    Clear All
                  </button>
                )}
              </div>

              {/* Filters */}
              {tasks.length > 0 && (
                <div className="flex flex-wrap gap-3 mb-4 pb-4 border-b border-gray-200">
                  <div className="flex gap-2">
                    <label className="text-sm font-medium text-gray-700">Status:</label>
                    <select
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value as any)}
                      className="text-sm border border-gray-300 rounded px-2 py-1"
                    >
                      <option value="all">All</option>
                      <option value="pending">Pending</option>
                      <option value="completed">Completed</option>
                    </select>
                  </div>
                  <div className="flex gap-2">
                    <label className="text-sm font-medium text-gray-700">Priority:</label>
                    <select
                      value={filterPriority}
                      onChange={(e) => setFilterPriority(e.target.value as any)}
                      className="text-sm border border-gray-300 rounded px-2 py-1"
                    >
                      <option value="all">All</option>
                      <option value="high">High</option>
                      <option value="medium">Medium</option>
                      <option value="low">Low</option>
                    </select>
                  </div>
                </div>
              )}

              <TaskList
                tasks={filteredTasks}
                onToggle={handleToggleTask}
                onDelete={handleDeleteTask}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
