import { useState } from "react";
import { Eye, Pencil, Send, FileText, Plus, Link } from "lucide-react";
import { ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { Button } from "../components/ui/button"; // Ensure this path is correct

const blasts = [
  {
    id: 1,
    title: "New Listing - Oceanview Condo",
    status: "Sent",
    delivered: 150,
    opened: 75,
    dateDelivered: "2025-02-24",
    timeDelivered: "14:30 EST",
    thumbnail: "/images/flyer1.jpg",
    address: "123 Ocean Drive, Miami, FL",
    price: 750,
  },
  {
    id: 2,
    title: "Price Drop Alert!",
    status: "Scheduled",
    delivered: 0,
    opened: 0,
    dateDelivered: "",
    timeDelivered: "",
    thumbnail: "/images/flyer2.jpg",
    address: "456 Palm Ave, Los Angeles, CA",
    price: 920,
  },
  {
    id: 3,
    title: "Just Sold - Success Story",
    status: "Draft",
    delivered: 0,
    opened: 0,
    dateDelivered: "",
    timeDelivered: "",
    thumbnail: "/images/flyer3.jpg",
    address: "789 Sunset Blvd, New York, NY",
    price: 680,
  },
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

      {/* Search and Create Button */}
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

      {/* Filters */}
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

      {/* Listings */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredBlasts.map((blast) => {
          const openRate =
            blast.delivered > 0 ? ((blast.opened / blast.delivered) * 100).toFixed(1) : 0;
          return (
            <div key={blast.id} className="p-4 border rounded-md">
              <img
                src={blast.thumbnail}
                alt="Flyer Thumbnail"
                className="w-full h-40 object-cover rounded-md mb-4"
              />
              <h2 className="text-lg font-semibold">{blast.title}</h2>
              <p className="text-sm text-gray-500">{blast.address}</p>
              <p className="text-sm font-bold text-gray-700">${blast.price}K</p>
              <p className={`text-sm font-semibold px-2 py-1 rounded w-max mt-2 ${statusColors[blast.status]}`}>
                {blast.status}
              </p>

              {/* View Receipt and Social Link (Only if Sent) */}
              {blast.status === "Sent" && (
                <div className="flex items-center space-x-2 mt-2">
                  <Button variant="outline" size="sm">
                    <FileText className="w-4 h-4" /> View Receipt
                  </Button>
                  <Button variant="outline" size="sm">
                    <Link className="w-4 h-4" /> Social Link
                  </Button>
                </div>
              )}

              {/* Date and Time Delivered (Only if Sent) */}
              {blast.status === "Sent" && (
                <div className="mt-2">
                  <p className="text-sm text-gray-500">Date Delivered: {blast.dateDelivered}</p>
                  <p className="text-sm text-gray-500">Time Delivered: {blast.timeDelivered}</p>
                </div>
              )}

              {/* Analytics */}
              <div className="grid grid-cols-2 gap-4 items-center mt-2">
                <div>
                  <p className="text-sm text-gray-500">
                    Delivered: <span className="font-bold">{blast.delivered}</span>
                  </p>
                  <p className="text-sm text-gray-500">
                    Opened: <span className="font-bold">{blast.opened}</span>
                  </p>
                </div>
                <div className="relative w-20 h-20 flex justify-center items-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        dataKey="value"
                        data={[{ value: blast.opened }, { value: blast.delivered - blast.opened }]}
                        innerRadius={30}
                        outerRadius={40}
                        startAngle={180}
                        endAngle={0}
                        fill="#4CAF50"
                      >
                        {COLORS.map((color, index) => (
                          <Cell key={`cell-${index}`} fill={color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                  <p className="absolute text-sm font-bold">{openRate}%</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-2 mt-4">
                <Button variant="outline" size="sm">
                  <Eye className="w-4 h-4" /> Preview
                </Button>
                {blast.status !== "Draft" && (
                  <Button variant="outline" size="sm">
                    <Pencil className="w-4 h-4" /> Edit
                  </Button>
                )}
                {blast.status === "Sent" && (
                  <Button size="sm">
                    <Send className="w-4 h-4" /> Resend
                  </Button>
                )}
                {blast.status === "Draft" && (
                  <Button size="sm">
                    <Send className="w-4 h-4" /> Send
                  </Button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
