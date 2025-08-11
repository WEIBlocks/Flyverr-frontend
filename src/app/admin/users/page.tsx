"use client"

import React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function AdminUsersPage() {
  const users = [
    { id: "u_001", email: "alice@example.com", name: "Alice Doe", role: "creator", joined: "2025-07-01" },
    { id: "u_002", email: "bob@example.com", name: "Bob Smith", role: "buyer", joined: "2025-06-15" },
  ]

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">User Management</h2>
      <Card className="border-0 bg-white dark:bg-gray-800">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-50 dark:bg-gray-700/50 text-left text-gray-600 dark:text-gray-300">
                <tr>
                  <th className="px-4 py-3">ID</th>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">Role</th>
                  <th className="px-4 py-3">Joined</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u.id} className="border-b border-gray-100 dark:border-gray-700/50">
                    <td className="px-4 py-3 font-mono text-xs">{u.id}</td>
                    <td className="px-4 py-3">{u.name}</td>
                    <td className="px-4 py-3">{u.email}</td>
                    <td className="px-4 py-3 capitalize">{u.role}</td>
                    <td className="px-4 py-3">{u.joined}</td>
                    <td className="px-4 py-3 space-x-2">
                      <Button size="sm" variant="outline">Promote</Button>
                      <Button size="sm" variant="destructive">Ban</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}


