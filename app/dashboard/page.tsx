'use client';

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileText, Home, User, MessageSquare, Phone, PlusCircle, CheckCircle, Clock, XCircle, Filter } from "lucide-react";
import Link from "next/link";

export default function Dashboard() {
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
      case 'rejected':
        return <XCircle className="h-5 w-5 text-red-500" />;
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
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <label htmlFor="title">Title</label>
                    <Input id="title" placeholder="Enter complaint title" />
                  </div>
                  <div className="grid gap-2">
                    <label htmlFor="category">Category</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="utilities">Utilities</SelectItem>
                        <SelectItem value="infrastructure">Infrastructure</SelectItem>
                        <SelectItem value="sanitation">Sanitation</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <label htmlFor="description">Description</label>
                    <Input id="description" placeholder="Describe your complaint" />
                  </div>
                  <div className="grid gap-2">
                    <label htmlFor="location">Location</label>
                    <Input id="location" placeholder="Enter location" />
                  </div>
                </div>
                <Button className="w-full bg-sky-600 hover:bg-sky-700">Submit Complaint</Button>
              </DialogContent>
            </Dialog>
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
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="utilities">Utilities</SelectItem>
                <SelectItem value="infrastructure">Infrastructure</SelectItem>
                <SelectItem value="sanitation">Sanitation</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
            <Input className="w-[200px]" placeholder="Search complaints..." />
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