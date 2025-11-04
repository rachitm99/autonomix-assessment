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
              <span>✅ Cloud Run Backend</span>
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
