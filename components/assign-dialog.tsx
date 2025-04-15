"use client"

import { useState } from "react"
import { Check, Search, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

// Mock data for officers
const mockOfficers = [
  { id: "1", name: "John Smith", category: "IT"},
  { id: "2", name: "Sarah Johnson", category: "Finance"},
  { id: "3", name: "Michael Brown", category: "Logistics"},
  { id: "4", name: "Emily Davis", category: "Support"},
  { id: "5", name: "Robert Wilson", category: "IT"},
  { id: "6", name: "Jennifer Taylor", category: "Finance"},
]

interface AssignDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  complaint: any
}

export function AssignDialog({ open, onOpenChange, complaint }: AssignDialogProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedOfficerId, setSelectedOfficerId] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const filteredOfficers = mockOfficers.filter(
    (officer) =>
      officer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      officer.category.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleSubmit = async () => {
    if (!selectedOfficerId) return

    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Handle assignment logic here
    console.log("Assigned complaint:", complaint.id, "to officer:", selectedOfficerId)

    setIsSubmitting(false)
    setSelectedOfficerId("")
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Assign Complaint</DialogTitle>
          <DialogDescription>Select an officer to handle this complaint.</DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="bg-sky-50 p-3 rounded-md">
            <h4 className="font-medium">{complaint.title}</h4>
            <p className="text-sm text-gray-600 mt-1">category: {complaint.category}</p>
          </div>

          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search by category"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>

          <div className="border rounded-md max-h-[240px] overflow-y-auto">
            <RadioGroup value={selectedOfficerId} onValueChange={setSelectedOfficerId}>
              {filteredOfficers.map((officer) => (
                <div
                  key={officer.id}
                  className={`flex items-center space-x-2 p-3 border-b last:border-0 hover:bg-gray-50 ${
                    selectedOfficerId === officer.id ? "bg-sky-50" : ""
                  }`}
                >
                  <RadioGroupItem value={officer.id} id={`officer-${officer.id}`} />
                  <Label htmlFor={`officer-${officer.id}`} className="flex flex-1 items-center gap-3 cursor-pointer">
                    <div className="h-8 w-8 rounded-full bg-sky-100 flex items-center justify-center text-sky-600">
                      <User className="h-4 w-4" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">{officer.name}</div>
                      <div className="text-sm text-gray-500">
                        {officer.category}
                      </div>
                    </div>
                  </Label>
                </div>
              ))}

              {filteredOfficers.length === 0 && (
                <div className="p-4 text-center text-gray-500">No officers found matching your search.</div>
              )}
            </RadioGroup>
          </div>
        </div>
        <DialogFooter className="sm:justify-between">
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            type="button"
            onClick={handleSubmit}
            disabled={!selectedOfficerId || isSubmitting}
            className="bg-sky-500 hover:bg-sky-600 text-white gap-1"
          >
            <Check className="h-4 w-4" />
            {isSubmitting ? "Assigning..." : "Assign Officer"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}