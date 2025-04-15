'use client';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "../ui/input";

export default function ComplaintFilters() {
  return (
    <div className="flex flex-col md:flex-row md:items-center gap-4 mb-8">
      <div className="flex items-center space-x-2">
        <label htmlFor="category" className="text-sm font-medium text-gray-700">
          Category:
        </label>
        <Select>
          <SelectTrigger className="w-[180px]">
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
      <div className="flex items-center space-x-2">
        <label htmlFor="status" className="text-sm font-medium text-gray-700">
          Status:
        </label>
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select status" />
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
      </div>
      <div className="flex items-center space-x-2">
  <label htmlFor="location" className="text-sm font-medium text-gray-700">
    Location:
  </label>
  <Input
    id="location"
    type="text"
    placeholder="Filter by location"
    className="w-[180px]"
  />
</div>

    </div>
  );
}
