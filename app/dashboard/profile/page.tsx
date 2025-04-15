'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { FileText, Home, User, MessageSquare, Phone, Camera, Mail, UserCircle } from "lucide-react";
import Link from "next/link";

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    role: "User",
    joinDate: "March 15, 2024"
  });

  const handleSave = () => {
    setIsEditing(false);
    // Here you would typically save the changes to your backend
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r">
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
          <Link href="/dashboard/profile" className="flex items-center px-6 py-3 text-sky-600 bg-sky-50">
            <User className="h-5 w-5 mr-3" />
            Profile
          </Link>
          <Link href="/dashboard" className="flex items-center px-6 py-3 text-gray-600 hover:bg-sky-50 hover:text-sky-600">
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
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-900 mb-8">My Profile</h1>

          <Card className="p-8">
            <div className="flex flex-col items-center mb-8">
              <div className="relative">
                <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80"
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                <button className="absolute bottom-0 right-0 bg-sky-600 text-white p-2 rounded-full hover:bg-sky-700">
                  <Camera className="h-5 w-5" />
                </button>
              </div>
              <h2 className="text-2xl font-semibold mt-4">{userData.name}</h2>
              <span className="text-gray-500">{userData.role}</span>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <User className="h-4 w-4 inline-block mr-2" />
                    Full Name
                  </label>
                  {isEditing ? (
                    <Input
                      value={userData.name}
                      onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                      className="w-full"
                    />
                  ) : (
                    <p className="text-gray-900 p-2 bg-gray-50 rounded-md">{userData.name}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Mail className="h-4 w-4 inline-block mr-2" />
                    Email Address
                  </label>
                  {isEditing ? (
                    <Input
                      value={userData.email}
                      onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                      className="w-full"
                    />
                  ) : (
                    <p className="text-gray-900 p-2 bg-gray-50 rounded-md">{userData.email}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Phone className="h-4 w-4 inline-block mr-2" />
                    Phone Number
                  </label>
                  {isEditing ? (
                    <Input
                      value={userData.phone}
                      onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
                      className="w-full"
                    />
                  ) : (
                    <p className="text-gray-900 p-2 bg-gray-50 rounded-md">{userData.phone}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <UserCircle className="h-4 w-4 inline-block mr-2" />
                    Role
                  </label>
                  <p className="text-gray-900 p-2 bg-gray-50 rounded-md">{userData.role}</p>
                </div>
              </div>

              <div className="border-t pt-6 mt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Member since</p>
                    <p className="text-gray-900">{userData.joinDate}</p>
                  </div>
                  {isEditing ? (
                    <div className="space-x-4">
                      <Button variant="outline" onClick={() => setIsEditing(false)}>
                        Cancel
                      </Button>
                      <Button className="bg-sky-600 hover:bg-sky-700" onClick={handleSave}>
                        Save Changes
                      </Button>
                    </div>
                  ) : (
                    <Button className="bg-sky-600 hover:bg-sky-700" onClick={() => setIsEditing(true)}>
                      Edit Profile
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}