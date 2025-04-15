"use client"

import { useState } from "react"
import { Clock, Eye, Filter } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { RejectDialog } from "./reject-dialog"
import { AssignDialog } from "./assign-dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";


// Mock data for complaints
const mockComplaints = [
  {
    id: "1",
    title: "Website not working properly",
    category: "IT",
    date: "2023-04-15",
    status: "pending",
    description: "The company website is showing errors when trying to submit forms.",
    location:'New York',
  },
  {
    id: "2",
    title: "Payment processing issue",
    category: "Finance",
    date: "2023-04-14",
    status: "pending",
    description: "Customers are reporting issues with payment processing on checkout.",
    location:'New York',
  },
  {
    id: "3",
    title: "Product delivery delay",
    category: "Logistics",
    date: "2023-04-13",
    status: "pending",
    description: "Multiple customers reporting significant delays in product delivery.",
    location:'New York',
  },
  {
    id: "4",
    title: "Customer service unresponsive",
    category: "Support",
    date: "2023-04-12",
    status: "pending",
    description: "Customers unable to reach customer service through phone or email.",
    location:'New York',
  },
  {
    id: "5",
    title: "App crashing on login",
    category: "IT",
    date: "2023-04-11",
    status: "pending",
    description: "Mobile app crashes immediately after users attempt to login.",
    location:'New York',
  },
]

export function ComplaintsList() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedComplaint, setSelectedComplaint] = useState<any>(null)
  const [isRejectDialogOpen, setIsRejectDialogOpen] = useState(false)
  const [isAssignDialogOpen, setIsAssignDialogOpen] = useState(false)
  const [category, setCategory] = useState("")

  const filteredComplaints = mockComplaints.filter(
    (complaint) =>
      complaint.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      complaint.category.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleViewDetails = (complaint: any) => {
    setSelectedComplaint(complaint)
  }

  const handleReject = (complaint: any) => {
    setSelectedComplaint(complaint)
    setIsRejectDialogOpen(true)
  }

  const handleAssign = (complaint: any) => {
    setSelectedComplaint(complaint)
    setIsAssignDialogOpen(true)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <h2 className="text-2xl font-bold">Pending Complaints</h2>
        <div className="flex gap-2 w-full sm:w-auto">
        <Select value={category} onValueChange={(val) => setCategory(val)} required>
          <SelectTrigger className="max-w-xs">
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
          <Input
            placeholder="Filter by location"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-xs"
          />
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid gap-4">
        {filteredComplaints.map((complaint) => (
          <Card key={complaint.id} className="overflow-hidden">
            <CardHeader className=" pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg font-medium">{complaint.title}</CardTitle>
                <div className="flex items-center gap-1 text-amber-600 bg-amber-50 px-2 py-1 rounded-full text-xs">
                  <Clock className="h-3 w-3" />
                  <span>Pending</span>
                </div>
              </div>
              <div className="text-sm text-muted-foreground mt-1">
                Department: {complaint.category} • Submitted: {complaint.date}
              </div>
            </CardHeader>
            <CardContent className="pt-4">
              <p className="text-sm text-gray-600 mb-4 line-clamp-2">{complaint.description}</p>
              <div className="flex flex-wrap gap-2">
              <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-1"
                    >
                      <Eye className="h-4 w-4" />
                      View Details
                    </Button>
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

                <Button
                  variant="outline"
                  size="sm"
                  className="text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600"
                  onClick={() => handleReject(complaint)}
                >
                  Reject
                </Button>
                <Button
                  size="sm"
                  className="bg-sky-500 hover:bg-sky-600 text-white"
                  onClick={() => handleAssign(complaint)}
                >
                  Assign
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedComplaint && (
        <>
          <RejectDialog open={isRejectDialogOpen} onOpenChange={setIsRejectDialogOpen} complaint={selectedComplaint} />
          <AssignDialog open={isAssignDialogOpen} onOpenChange={setIsAssignDialogOpen} complaint={selectedComplaint} />
        </>
      )}
    </div>
  )
}