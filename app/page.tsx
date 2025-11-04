"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Sparkles, BarChart3, Lock, Database, Zap } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem("token");
    if (token) {
      router.push("/dashboard");
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-16 max-w-6xl">
        {/* Header */}
        <header className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Sparkles className="w-12 h-12 text-indigo-600" />
            <h1 className="text-5xl font-bold text-gray-900">InsightBoard AI</h1>
          </div>
          <p className="text-gray-600 text-xl mb-8">
            Transform meeting transcripts into actionable tasks with AI
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/register"
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors"
            >
              Get Started
            </Link>
            <Link
              href="/login"
              className="bg-white hover:bg-gray-50 text-indigo-600 font-semibold py-3 px-8 rounded-lg border-2 border-indigo-600 transition-colors"
            >
              Sign In
            </Link>
          </div>
        </header>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <Sparkles className="w-12 h-12 text-indigo-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">AI-Powered Analysis</h3>
            <p className="text-gray-600">
              Automatically extract action items with intelligent priority detection using Google Gemini
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <Database className="w-12 h-12 text-indigo-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Cloud Storage</h3>
            <p className="text-gray-600">
              Your tasks are securely stored in MongoDB Atlas with full authentication
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <BarChart3 className="w-12 h-12 text-indigo-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Analytics & Insights</h3>
            <p className="text-gray-600">
              Visualize your progress with interactive charts and priority tracking
            </p>
          </div>
        </div>

        {/* Level 3 Badge */}
        <div className="text-center">
          <div className="inline-block bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center gap-3 mb-3">
              <Zap className="w-8 h-8 text-yellow-500" />
              <h2 className="text-2xl font-bold text-gray-900">Level 3 Complete</h2>
            </div>
            <div className="flex gap-4 text-sm text-gray-600">
              <span>✅ AWS Lambda Backend</span>
              <span>✅ MongoDB Atlas</span>
              <span>✅ Authentication</span>
              <span>✅ AI Auto-Tagging</span>
              <span>✅ Export</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [filterStatus, setFilterStatus] = useState<"all" | "pending" | "completed">("all");
  const [filterPriority, setFilterPriority] = useState<"all" | "high" | "medium" | "low">("all");

  // Load tasks from localStorage on mount
  useEffect(() => {
    const savedTasks = localStorage.getItem("insightboard-tasks");
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem("insightboard-tasks", JSON.stringify(tasks));
    }
  }, [tasks]);

  const handleTranscriptSubmit = async (transcript: string) => {
    setLoading(true);
    try {
      const response = await fetch("/api/generate-tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ transcript }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate tasks");
      }

      const data = await response.json();
      const newTasks: Task[] = data.tasks.map((task: any) => ({
        id: Date.now() + Math.random(),
        text: task.text,
        status: "pending" as const,
        priority: task.priority || "medium",
        createdAt: new Date().toISOString(),
      }));

      setTasks((prev) => [...prev, ...newTasks]);
    } catch (error) {
      console.error("Error generating tasks:", error);
      alert("Failed to generate tasks. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleToggleTask = (id: number) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? { ...task, status: task.status === "pending" ? "completed" : "pending" }
          : task
      )
    );
  };

  const handleDeleteTask = (id: number) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const handleClearAll = () => {
    if (confirm("Are you sure you want to clear all tasks?")) {
      setTasks([]);
      localStorage.removeItem("insightboard-tasks");
    }
  };

  // Filter tasks
  const filteredTasks = tasks.filter((task) => {
    const matchesStatus = filterStatus === "all" || task.status === filterStatus;
    const matchesPriority = filterPriority === "all" || task.priority === filterPriority;
    return matchesStatus && matchesPriority;
  });

  const completedCount = tasks.filter((t) => t.status === "completed").length;
  const pendingCount = tasks.filter((t) => t.status === "pending").length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <header className="mb-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-2">
            <Sparkles className="w-10 h-10 text-indigo-600" />
            <h1 className="text-4xl font-bold text-gray-900">InsightBoard AI</h1>
          </div>
          <p className="text-gray-600 text-lg">
            Transform meeting transcripts into actionable tasks with AI
          </p>
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
