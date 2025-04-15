import { Card } from "@/components/ui/card";

const complaints = [
  {
    id: 1,
    title: "Street light not working",
    description: "The street light near my house has been out for a week.",
    status: "Pending",
    date: "2023-10-01",
  },
  {
    id: 2,
    title: "Water leakage",
    description: "There is a water leakage in front of my building.",
    status: "In Progress",
    date: "2023-09-28",
  },
  {
    id: 3,
    title: "Garbage not collected",
    description: "Garbage hasn't been collected for 3 days in our lane.",
    status: "Completed",
    date: "2023-09-25",
  },
];

export default function ComplaintList() {
  return (
    <div className="grid grid-cols-1 gap-6">
      {complaints.map((complaint) => (
        <Card key={complaint.id} className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">{complaint.title}</h2>
              <p className="text-sm text-gray-600 mt-1">{complaint.description}</p>
              <p className="text-xs text-gray-400 mt-2">Date: {complaint.date}</p>
            </div>
            <span
              className={`text-sm px-3 py-1 rounded-full ${
                complaint.status === "Pending"
                  ? "bg-yellow-100 text-yellow-800"
                  : complaint.status === "In Progress"
                  ? "bg-blue-100 text-blue-800"
                  : "bg-green-100 text-green-800"
              }`}
            >
              {complaint.status}
            </span>
          </div>
        </Card>
      ))}
    </div>
  );
}
