"use client";

import { useState } from "react";
import { Send } from "lucide-react";

interface TranscriptFormProps {
  onSubmit: (transcript: string) => void;
  loading: boolean;
}

export default function TranscriptForm({ onSubmit, loading }: TranscriptFormProps) {
  const [transcript, setTranscript] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (transcript.trim()) {
      onSubmit(transcript);
      setTranscript("");
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 h-fit sticky top-8">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Submit Transcript</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="transcript" className="block text-sm font-medium text-gray-700 mb-2">
            Meeting Transcript
          </label>
          <textarea
            id="transcript"
            value={transcript}
            onChange={(e) => setTranscript(e.target.value)}
            placeholder="Paste your meeting transcript here..."
            className="w-full h-64 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none text-gray-900"
            disabled={loading}
            required
          />
        </div>
        <button
          type="submit"
          disabled={loading || !transcript.trim()}
          className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-colors"
        >
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              Generating Tasks...
            </>
          ) : (
            <>
              <Send className="w-5 h-5" />
              Generate Action Items
            </>
          )}
        </button>
      </form>
    </div>
  );
}
