import { Bell } from "lucide-react"

import { Button } from "@/components/ui/button"
import { SidebarTrigger } from "@/components/ui/sidebar"

export function OfficerHeader() {
  return (
    <header className="h-16 border-b bg-white flex items-center px-4 sticky top-0 z-10">
      <div className="flex items-center gap-2">
        {/* <SidebarTrigger /> */}
        <h1 className="text-2xl font-semibold">Officer Dashboard</h1>
      </div>
      <div className="ml-190 flex items-center gap-2">
        <Button variant="outline" size="icon">
          <Bell className="h-5 w-5" />
        </Button>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-sky-500 flex items-center justify-center text-white font-bold">J</div>
          <div className="hidden md:block">
            <div className="font-medium">John Smith</div>
            <div className="text-xs text-muted-foreground">Road Damage Department</div>
          </div>
        </div>
      </div>
    </header>
  )
}
