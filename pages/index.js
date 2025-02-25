import { useState } from "react";
import { Button } from "../components/ui/button";
import { Eye, Pencil, Send, FileText, Plus, Link } from "lucide-react";
import { ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const blasts = [
  { id: 1, title: "New Listing - Oceanview Condo", status: "Sent", delivered: 150, opened: 75, dateDelivered: "2025-02-24", timeDelivered: "14:30 EST", thumbnail: "/images/flyer1.jpg", address: "123 Ocean Drive, Miami, FL", price: 750 },
  { id: 2, title: "Price Drop Alert!", status: "Scheduled", delivered: 0, opened: 0, dateDelivered: "", timeDelivered: "", thumbnail: "/images/flyer2.jpg", address: "456 Palm Ave, Los Angeles, CA", price: 920 },
  { id: 3, title: "Just Sold - Success Story", status: "Draft", delivered: 0, opened: 0, dateDelivered: "", timeDelivered: "", thumbnail: "/images/flyer3.jpg", address: "789 Sunset Blvd, New York, NY", price: 680 },
];

const statusColors = {
  Sent: "text-green-600 bg-green-100",
  Scheduled: "text-yellow-600 bg-yellow-100",
  Draft: "text-gray-600 bg-gray-100",
};

const COLORS = ["#4CAF50", "#E0E0E0"];

export default function AgentDashboard() {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  const filteredBlasts = blasts.filter(
    (blast) =>
      (filter === "All" || blast.status === filter) &&
      blast.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Agent Dashboard</h1>

      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search Flyers..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-1/2 p-2 border rounded"
        />
        <Button size="sm" className="flex items-center gap-2">
          <Plus className="w-4 h-4" /> Create New Blast
        </Button>
      </div>

      <div className="flex space-x-2 mb-4">
        {["All", "Sent", "Scheduled", "Draft"].map((status) => (
          <Button
            key={status}
            variant={filter === status ? "default" : "outline"}
            onClick={() => setFilter(status)}
          >
            {status}
          </Button>
        ))}
      </div>
    </div>
  );
}
