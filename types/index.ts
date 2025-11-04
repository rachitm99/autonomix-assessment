export interface Task {
  _id: string;
  id?: number; // Legacy support
  text: string;
  status: "pending" | "completed";
  priority: "high" | "medium" | "low";
  tags?: string[];
  createdAt?: string;
}
