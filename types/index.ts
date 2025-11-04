export interface Task {
  id: number;
  text: string;
  status: "pending" | "completed";
  priority: "high" | "medium" | "low";
  createdAt: string;
}
