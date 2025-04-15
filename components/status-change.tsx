"use client"

import { useState } from "react"
import { CheckCircle, PlayCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

interface StatusChangeDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  complaint: any
  onStatusChange: (complaintId: string, newStatus: string, remark: string) => void
}

export function StatusChangeDialog({ open, onOpenChange, complaint, onStatusChange }: StatusChangeDialogProps) {
  const [newStatus, setNewStatus] = useState(complaint?.status || "assigned")
  const [remarks, setRemarks] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async () => {
    if (!remarks.trim()) return

    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Handle status change
    onStatusChange(complaint.id, newStatus, remarks)

    setIsSubmitting(false)
    setRemarks("")
    onOpenChange(false)
  }

  // Reset form when dialog opens
  const handleOpenChange = (open: boolean) => {
    if (open) {
      setNewStatus(complaint?.status || "assigned")
      setRemarks("")
    }
    onOpenChange(open)
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Change Complaint Status</DialogTitle>
          <DialogDescription>Update the status of this complaint and add remarks.</DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="bg-sky-50 p-3 rounded-md">
            <h4 className="font-medium">{complaint?.title}</h4>
            <p className="text-sm text-gray-600 mt-1">Current Status: {complaint?.status.replace("_", " ")}</p>
          </div>

          <div className="space-y-2">
            <Label>New Status</Label>
            <RadioGroup value={newStatus} onValueChange={setNewStatus} className="flex flex-col space-y-1">
              {complaint?.status !== "in_progress" && (
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="in_progress" id="in_progress" />
                  <Label htmlFor="in_progress" className="flex items-center gap-2 cursor-pointer">
                    <PlayCircle className="h-4 w-4 text-blue-500" />
                    <span>In Progress</span>
                  </Label>
                </div>
              )}
              {complaint?.status !== "completed" && (
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="completed" id="completed" />
                  <Label htmlFor="completed" className="flex items-center gap-2 cursor-pointer">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Completed</span>
                  </Label>
                </div>
              )}
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label htmlFor="remarks">Remarks</Label>
            <Textarea
              id="remarks"
              placeholder="Add your remarks about this status change..."
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              className="min-h-[100px]"
            />
          </div>
        </div>
        <DialogFooter className="sm:justify-between">
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            type="button"
            onClick={handleSubmit}
            disabled={!remarks.trim() || isSubmitting}
            className="bg-sky-500 hover:bg-sky-600 text-white"
          >
            {isSubmitting ? "Updating..." : "Update Status"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
