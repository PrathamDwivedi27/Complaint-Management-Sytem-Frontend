// "use client"

// import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
// import { StatsCards } from "@/components/dashboard/stats-cards"
// // import { ComplaintFilters } from "@/components/dashboard/complaint-filters"
// import { ComplaintsList } from "@/components/complaints-list"
// import { NewComplaintButton } from "@/components/dashboard/new-complaint"

// export default function Dashboard() {
//   return (
//     <DashboardLayout>
//       <div className="max-w-6xl mx-auto">
//         {/* Header */}
//         <div className="flex justify-between items-center mb-8">
//           <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
//           <NewComplaintButton />
//         </div>

//         {/* Stats */}
//         <StatsCards />

//         {/* Filters */}
//         {/* <ComplaintFilters /> */}

//         {/* Complaints List */}
//         <ComplaintsList />
//       </div>
//     </DashboardLayout>
//   )
// }

'use client';

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileText, Home, User, MessageSquare, Phone, PlusCircle, CheckCircle, Clock, XCircle, Filter } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
    Tooltip,
    TooltipTrigger,
    TooltipContent,
    TooltipProvider,
  } from "@/components/ui/tooltip";

export default function Dashboard() {
    const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const complaintData = {
      title,
      description,
      category,
      location,
    };

    try {
      const res = await fetch("/api/complaints", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(complaintData),
      });

      if (res.ok) {
        router.refresh(); // or router.push() if you want to navigate
      } else {
        console.error("Failed to submit complaint");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const complaints = [
    {
      id: 1,
      title: "Water Supply Issue",
      description: "No water supply in Block A for the past 2 days...",
      location: "Block A, Street 5",
      status: "pending",
      category: "Utilities",
      date: "2024-03-20",
    },
    {
      id: 2,
      title: "Street Light Malfunction",
      description: "Street lights not working in the evening...",
      location: "Main Road, Sector 7",
      status: "in-progress",
      category: "Infrastructure",
      date: "2024-03-19",
    },
    {
      id: 3,
      title: "Garbage Collection",
      description: "Regular garbage collection not happening...",
      location: "Block C, Street 2",
      status: "completed",
      category: "Sanitation",
      date: "2024-03-18",
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'in-progress':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'approved':
        return <CheckCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Clock className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white">
        <div className="p-6">
          <div className="flex items-center space-x-2">
            <FileText className="h-6 w-6 text-sky-600" />
            <span className="text-xl font-semibold">ComplaintCare</span>
          </div>
        </div>
        <nav className="mt-6">
          <Link href="/" className="flex items-center px-6 py-3 text-gray-600 hover:bg-sky-50 hover:text-sky-600">
            <Home className="h-5 w-5 mr-3" />
            Home
          </Link>
          <Link href="/dashboard/profile" className="flex items-center px-6 py-3 text-gray-600 hover:bg-sky-50 hover:text-sky-600">
            <User className="h-5 w-5 mr-3" />
            Profile
          </Link>
          <Link href="/dashboard" className="flex items-center px-6 py-3 text-sky-600 bg-sky-50">
            <MessageSquare className="h-5 w-5 mr-3" />
            My Complaints
          </Link>
          <Link href="/contact" className="flex items-center px-6 py-3 text-gray-600 hover:bg-sky-50 hover:text-sky-600">
            <Phone className="h-5 w-5 mr-3" />
            Contact Us
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            {/* <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-sky-600 hover:bg-sky-700 text-white">
                <PlusCircle className="h-5 w-5 mr-1" />
                File New Complaint
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>File New Complaint</DialogTitle>
              </DialogHeader>

              <form onSubmit={handleSubmit} className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <label htmlFor="title">Title</label>
                  <Input
                    id="title"
                    placeholder="Enter complaint title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>

                <div className="grid gap-2">
                  <label htmlFor="description">Description</label>
                  <Input
                    id="description"
                    placeholder="Describe your complaint"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  />
                </div>

                <div className="grid gap-2">
                  <label htmlFor="category">Category</label>
                  <Select value={category} onValueChange={(val) => setCategory(val)} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
  <SelectItem value="road_damage" className="border-l-4 border-red-500 pl-3">
    <span className="text-red-600">Road Damage</span>
  </SelectItem>

  <SelectItem value="water_leakage" className="border-l-4 border-blue-500 pl-3">
    <span className="text-blue-600">Water Leakage</span>
  </SelectItem>

  <SelectItem value="garbage_collection" className="border-l-4 border-green-500 pl-3">
    <span className="text-green-600">Garbage Collection</span>
  </SelectItem>

  <SelectItem value="street_lights" className="border-l-4 border-yellow-500 pl-3">
    <span className="text-yellow-600">Street Lights</span>
  </SelectItem>

  <SelectItem value="traffic_signals" className="border-l-4 border-orange-500 pl-3">
    <span className="text-orange-600">Traffic Signals</span>
  </SelectItem>

  <SelectItem value="illegal_construction" className="border-l-4 border-purple-500 pl-3">
    <span className="text-purple-600">Illegal Construction</span>
  </SelectItem>

  <SelectItem value="sewage_issues" className="border-l-4 border-teal-500 pl-3">
    <span className="text-teal-600">Sewage Issues</span>
  </SelectItem>

  <SelectItem value="noise_pollution" className="border-l-4 border-pink-500 pl-3">
    <span className="text-pink-600">Noise Pollution</span>
  </SelectItem>

  <SelectItem value="harassment" className="border-l-4 border-rose-500 pl-3">
    <span className="text-rose-600">Harassment</span>
  </SelectItem>

  <SelectItem value="discrimination" className="border-l-4 border-indigo-500 pl-3">
    <span className="text-indigo-600">Discrimination</span>
  </SelectItem>

  <SelectItem value="fraud" className="border-l-4 border-amber-500 pl-3">
    <span className="text-amber-600">Fraud</span>
  </SelectItem>

  <SelectItem value="telecom_issues" className="border-l-4 border-cyan-500 pl-3">
    <span className="text-cyan-600">Internet & Telecom Issues</span>
  </SelectItem>
</SelectContent>

                  </Select>
                </div>

                <div className="grid gap-2">
                  <label htmlFor="location">Location</label>
                  <Input
                    id="location"
                    placeholder="Enter location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    required
                  />
                </div>

                <Button type="submit" className="w-full bg-sky-600 hover:bg-sky-700">
                  Submit Complaint
                </Button>
              </form>
            </DialogContent>
          </Dialog> */}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="p-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                  <Clock className="h-6 w-6 text-yellow-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-sm font-medium text-gray-500">Pending</h3>
                  <p className="text-2xl font-semibold text-gray-900">3</p>
                </div>
              </div>
            </Card>
            <Card className="p-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Clock className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-sm font-medium text-gray-500">In Progress</h3>
                  <p className="text-2xl font-semibold text-gray-900">2</p>
                </div>
              </div>
            </Card>
            <Card className="p-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-sm font-medium text-gray-500">Completed</h3>
                  <p className="text-2xl font-semibold text-gray-900">5</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Filters */}
          <div className="flex gap-4 mb-6">
            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">Filter by:</span>
            </div>
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="road_damage" className="border-l-4 border-red-500 pl-3">
                    <span className="text-red-600">Road Damage</span>
                </SelectItem>

                <SelectItem value="water_leakage" className="border-l-4 border-blue-500 pl-3">
                    <span className="text-blue-600">Water Leakage</span>
                </SelectItem>

                <SelectItem value="garbage_collection" className="border-l-4 border-green-500 pl-3">
                    <span className="text-green-600">Garbage Collection</span>
                </SelectItem>

                <SelectItem value="street_lights" className="border-l-4 border-yellow-500 pl-3">
                    <span className="text-yellow-600">Street Lights</span>
                </SelectItem>

                <SelectItem value="traffic_signals" className="border-l-4 border-orange-500 pl-3">
                    <span className="text-orange-600">Traffic Signals</span>
                </SelectItem>

                <SelectItem value="illegal_construction" className="border-l-4 border-purple-500 pl-3">
                    <span className="text-purple-600">Illegal Construction</span>
                </SelectItem>

                <SelectItem value="sewage_issues" className="border-l-4 border-teal-500 pl-3">
                    <span className="text-teal-600">Sewage Issues</span>
                </SelectItem>

                <SelectItem value="noise_pollution" className="border-l-4 border-pink-500 pl-3">
                    <span className="text-pink-600">Noise Pollution</span>
                </SelectItem>

                <SelectItem value="harassment" className="border-l-4 border-rose-500 pl-3">
                    <span className="text-rose-600">Harassment</span>
                </SelectItem>

                <SelectItem value="discrimination" className="border-l-4 border-indigo-500 pl-3">
                    <span className="text-indigo-600">Discrimination</span>
                </SelectItem>

                <SelectItem value="fraud" className="border-l-4 border-amber-500 pl-3">
                    <span className="text-amber-600">Fraud</span>
                </SelectItem>

                <SelectItem value="telecom_issues" className="border-l-4 border-cyan-500 pl-3">
                    <span className="text-cyan-600">Internet & Telecom Issues</span>
                </SelectItem>
                </SelectContent>

            </Select>
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all" className="border-l-4 border-gray-400 pl-3">
                    <span className="text-gray-600">All Status</span>
                </SelectItem>

                <SelectItem value="pending" className="border-l-4 border-yellow-500 pl-3">
                    <span className="text-yellow-600">Pending</span>
                </SelectItem>

                <SelectItem value="in-progress" className="border-l-4 border-blue-500 pl-3">
                    <span className="text-blue-600">In Progress</span>
                </SelectItem>

                <SelectItem value="approved" className="border-l-4 border-green-500 pl-3">
                    <span className="text-green-600">Approved</span>
                </SelectItem>

                <SelectItem value="completed" className="border-l-4 border-emerald-500 pl-3">
                    <span className="text-emerald-600">Completed</span>
                </SelectItem>
                </SelectContent>

            </Select>
            <Input className="w-[180px]" placeholder="Filter by location" />
             <div className="ml-auto">
             <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-sky-600 hover:bg-sky-700 text-white">
                <PlusCircle className="h-5 w-5 mr-1" />
                File New Complaint
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>File New Complaint</DialogTitle>
              </DialogHeader>

              <form onSubmit={handleSubmit} className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <label htmlFor="title">Title</label>
                  <Input
                    id="title"
                    placeholder="Enter complaint title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>

                <div className="grid gap-2">
                  <label htmlFor="description">Description</label>
                  <Input
                    id="description"
                    placeholder="Describe your complaint"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  />
                </div>

                <div className="grid gap-2">
                  <label htmlFor="category">Category</label>
                  <Select value={category} onValueChange={(val) => setCategory(val)} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
  <SelectItem value="road_damage" className="border-l-4 border-red-500 pl-3">
    <span className="text-red-600">Road Damage</span>
  </SelectItem>

  <SelectItem value="water_leakage" className="border-l-4 border-blue-500 pl-3">
    <span className="text-blue-600">Water Leakage</span>
  </SelectItem>

  <SelectItem value="garbage_collection" className="border-l-4 border-green-500 pl-3">
    <span className="text-green-600">Garbage Collection</span>
  </SelectItem>

  <SelectItem value="street_lights" className="border-l-4 border-yellow-500 pl-3">
    <span className="text-yellow-600">Street Lights</span>
  </SelectItem>

  <SelectItem value="traffic_signals" className="border-l-4 border-orange-500 pl-3">
    <span className="text-orange-600">Traffic Signals</span>
  </SelectItem>

  <SelectItem value="illegal_construction" className="border-l-4 border-purple-500 pl-3">
    <span className="text-purple-600">Illegal Construction</span>
  </SelectItem>

  <SelectItem value="sewage_issues" className="border-l-4 border-teal-500 pl-3">
    <span className="text-teal-600">Sewage Issues</span>
  </SelectItem>

  <SelectItem value="noise_pollution" className="border-l-4 border-pink-500 pl-3">
    <span className="text-pink-600">Noise Pollution</span>
  </SelectItem>

  <SelectItem value="harassment" className="border-l-4 border-rose-500 pl-3">
    <span className="text-rose-600">Harassment</span>
  </SelectItem>

  <SelectItem value="discrimination" className="border-l-4 border-indigo-500 pl-3">
    <span className="text-indigo-600">Discrimination</span>
  </SelectItem>

  <SelectItem value="fraud" className="border-l-4 border-amber-500 pl-3">
    <span className="text-amber-600">Fraud</span>
  </SelectItem>

  <SelectItem value="telecom_issues" className="border-l-4 border-cyan-500 pl-3">
    <span className="text-cyan-600">Internet & Telecom Issues</span>
  </SelectItem>
</SelectContent>

                  </Select>
                </div>

                <div className="grid gap-2">
                  <label htmlFor="location">Location</label>
                  <Input
                    id="location"
                    placeholder="Enter location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    required
                  />
                </div>

                <Button type="submit" className="w-full bg-sky-600 hover:bg-sky-700">
                  Submit Complaint
                </Button>
              </form>
            </DialogContent>
          </Dialog>
             </div>
            
          </div>

          {/* Complaints List */}
          <div className="bg-white rounded-lg shadow">
            <div className="divide-y divide-gray-200">
              {complaints.map((complaint) => (
                <div key={complaint.id} className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">{complaint.title}</h3>
                      <p className="mt-1 text-sm text-gray-500">{complaint.description}</p>
                      <div className="mt-2 flex items-center text-sm text-gray-500">
                        <span className="mr-4">{complaint.location}</span>
                        <span className="mr-4">•</span>
                        <span>{complaint.category}</span>
                        <span className="mr-4">•</span>
                        <span>{complaint.date}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      {getStatusIcon(complaint.status)}
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline">View Details</Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Complaint Details</DialogTitle>
                          </DialogHeader>
                          <div className="mt-4">
                            <h4 className="font-medium text-gray-900">{complaint.title}</h4>
                            <p className="mt-2 text-gray-500">{complaint.description}</p>
                            <dl className="mt-4 space-y-2">
                              <div>
                                <dt className="text-sm font-medium text-gray-500">Location</dt>
                                <dd className="text-sm text-gray-900">{complaint.location}</dd>
                              </div>
                              <div>
                                <dt className="text-sm font-medium text-gray-500">Category</dt>
                                <dd className="text-sm text-gray-900">{complaint.category}</dd>
                              </div>
                              <div>
                                <dt className="text-sm font-medium text-gray-500">Status</dt>
                                <dd className="text-sm text-gray-900 capitalize">{complaint.status}</dd>
                              </div>
                              <div>
                                <dt className="text-sm font-medium text-gray-500">Date Filed</dt>
                                <dd className="text-sm text-gray-900">{complaint.date}</dd>
                              </div>
                            </dl>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

