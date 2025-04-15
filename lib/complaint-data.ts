export const categoryOptions = [
    { value: "road_damage", label: "Road Damage", color: "red" },
    { value: "water_leakage", label: "Water Leakage", color: "blue" },
    { value: "garbage_collection", label: "Garbage Collection", color: "green" },
    { value: "street_lights", label: "Street Lights", color: "yellow" },
    { value: "traffic_signals", label: "Traffic Signals", color: "orange" },
    { value: "illegal_construction", label: "Illegal Construction", color: "purple" },
    { value: "sewage_issues", label: "Sewage Issues", color: "teal" },
    { value: "noise_pollution", label: "Noise Pollution", color: "pink" },
    { value: "harassment", label: "Harassment", color: "rose" },
    { value: "discrimination", label: "Discrimination", color: "indigo" },
    { value: "fraud", label: "Fraud", color: "amber" },
    { value: "telecom_issues", label: "Internet & Telecom Issues", color: "cyan" },
  ]
  
  export interface Complaint {
    id: number
    title: string
    description: string
    location: string
    status: string
    category: string
    date: string
  }
  
  export const mockComplaints: Complaint[] = [
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
  ]
  