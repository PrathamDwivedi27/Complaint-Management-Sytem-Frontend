
import Sidebar from "@/components/dashboard/Sidebar";
import Header from "@/components/dashboard/Header";
import StatsCards from "@/components/dashboard/StatCards";
import ComplaintFilters from "@/components/dashboard/ComplaintFilters";
import ComplaintFormDialog from "@/components/dashboard/ComplaintFormDialog";
import ComplaintList from "@/components/dashboard/ComplaintList";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="max-w-6xl mx-auto">
          <Header />
          <StatsCards />
          <ComplaintFilters />
          <ComplaintFormDialog />
          <ComplaintList />
        </div>
      </main>
    </div>
  );
}
