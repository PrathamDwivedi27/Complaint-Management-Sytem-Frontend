"use client"

import { useState } from "react"
import { CheckCircle, Clock, Filter, PlayCircle, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { StatusChangeDialog } from "./status-change"
import { AddRemarksDialog } from "./add-remark"
// Mock data for assigned complaints
const mockAssignedComplaints = [
  {
    id: "1",
    title: "Website not working properly",
    department: "IT",
    date: "2023-04-15",
    status: "approved",
    description: "The company website is showing errors when trying to submit forms.",
    remarks: [],
  },
  {
    id: "2",
    title: "Payment processing issue",
    department: "Finance",
    date: "2023-04-14",
    status: "in_progress",
    description: "Customers are reporting issues with payment processing on checkout.",
    remarks: [
      {
        text: "Started investigating the payment gateway integration.",
        timestamp: "2023-04-15T10:30:00Z",
      },
    ],
  },
  {
    id: "3",
    title: "Product delivery delay",
    department: "Logistics",
    date: "2023-04-13",
    status: "assigned",
    description: "Multiple customers reporting significant delays in product delivery.",
    remarks: [],
  },
  {
    id: "4",
    title: "Customer service unresponsive",
    department: "Support",
    date: "2023-04-12",
    status: "in_progress",
    description: "Customers unable to reach customer service through phone or email.",
    remarks: [
      {
        text: "Checked the phone system, found technical issues.",
        timestamp: "2023-04-13T14:20:00Z",
      },
    ],
  },
  {
    id: "5",
    title: "App crashing on login",
    department: "IT",
    date: "2023-04-11",
    status: "completed",
    description: "Mobile app crashes immediately after users attempt to login.",
    remarks: [
      {
        text: "Identified authentication service issue.",
        timestamp: "2023-04-12T09:15:00Z",
      },
      {
        text: "Fixed the authentication service and deployed the fix.",
        timestamp: "2023-04-13T16:45:00Z",
      },
    ],
  },
]

export function AssignedComplaints() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedComplaint, setSelectedComplaint] = useState<any>(null)
  const [isStatusDialogOpen, setIsStatusDialogOpen] = useState(false)
  const [isRemarksDialogOpen, setIsRemarksDialogOpen] = useState(false)
  const [complaints, setComplaints] = useState(mockAssignedComplaints)

  const filteredComplaints = complaints.filter(
    (complaint) =>
      complaint.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      complaint.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      complaint.status.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleStatusChange = (complaintId: string, newStatus: string, remark: string) => {
    setComplaints((prevComplaints) =>
      prevComplaints.map((complaint) => {
        if (complaint.id === complaintId) {
          return {
            ...complaint,
            status: newStatus,
            remarks: [
              ...complaint.remarks,
              {
                text: remark,
                timestamp: new Date().toISOString(),
              },
            ],
          }
        }
        return complaint
      }),
    )
  }

  const handleAddRemark = (complaintId: string, remark: string) => {
    setComplaints((prevComplaints) =>
      prevComplaints.map((complaint) => {
        if (complaint.id === complaintId) {
          return {
            ...complaint,
            remarks: [
              ...complaint.remarks,
              {
                text: remark,
                timestamp: new Date().toISOString(),
              },
            ],
          }
        }
        return complaint
      }),
    )
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return (
          <Badge variant="outline" className="flex items-center gap-1 text-amber-600 bg-amber-50 border-amber-200">
            <Clock className="h-3 w-3" />
            <span>Assigned</span>
          </Badge>
        )
      case "in_progress":
        return (
          <Badge variant="outline" className="flex items-center gap-1 text-blue-600 bg-blue-50 border-blue-200">
            <PlayCircle className="h-3 w-3" />
            <span>In Progress</span>
          </Badge>
        )
      case "completed":
        return (
          <Badge variant="outline" className="flex items-center gap-1 text-green-600 bg-green-50 border-green-200">
            <CheckCircle className="h-3 w-3" />
            <span>Completed</span>
          </Badge>
        )
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <h2 className="text-2xl font-bold">Assigned Complaints</h2>
        <div className="flex gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:flex-initial">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Filter by location"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 max-w-xs"
            />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid gap-4">
        {filteredComplaints.map((complaint) => (
          <Card key={complaint.id} className="overflow-hidden">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg font-medium">{complaint.title}</CardTitle>
                {getStatusBadge(complaint.status)}
              </div>
              <div className="text-sm text-muted-foreground mt-1">
                Department: {complaint.department} • Assigned: {complaint.date}
              </div>
            </CardHeader>
            <CardContent className="pt-4">
              <p className="text-sm text-gray-600 mb-4">{complaint.description}</p>

              {complaint.remarks.length > 0 && (
                <div className="mb-4 bg-gray-50 p-3 rounded-md">
                  <h4 className="text-sm font-medium mb-2">Recent Remarks:</h4>
                  <ul className="space-y-2">
                    {complaint.remarks.slice(-2).map((remark, index) => (
                      <li key={index} className="text-xs text-gray-600">
                        <span className="text-gray-500">{new Date(remark.timestamp).toLocaleString()}:</span>{" "}
                        {remark.text}
                      </li>
                    ))}
                  </ul>
                  {complaint.remarks.length > 2 && (
                    <p className="text-xs text-sky-500 mt-1 cursor-pointer">
                      + {complaint.remarks.length - 2} more remarks
                    </p>
                  )}
                </div>
              )}

              <div className="flex flex-wrap gap-2">
                {complaint.status !== "completed" && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-sky-50 border-sky-200 text-sky-700 hover:bg-sky-100"
                    onClick={() => {
                      setSelectedComplaint(complaint)
                      setIsStatusDialogOpen(true)
                    }}
                  >
                    Change Status
                  </Button>
                )}
                <Button
                  size="sm"
                  className="bg-sky-500 hover:bg-sky-600 text-white"
                  onClick={() => {
                    setSelectedComplaint(complaint)
                    setIsRemarksDialogOpen(true)
                  }}
                >
                  Add Remarks
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}

        {filteredComplaints.length === 0 && (
          <div className="text-center p-8 bg-gray-50 rounded-lg">
            <p className="text-gray-500">No complaints found matching your search.</p>
          </div>
        )}
      </div>

      {selectedComplaint && (
        <>
          <StatusChangeDialog
            open={isStatusDialogOpen}
            onOpenChange={setIsStatusDialogOpen}
            complaint={selectedComplaint}
            onStatusChange={handleStatusChange}
          />
          <AddRemarksDialog
            open={isRemarksDialogOpen}
            onOpenChange={setIsRemarksDialogOpen}
            complaint={selectedComplaint}
            onAddRemark={handleAddRemark}
          />
        </>
      )}
    </div>
  )
}
