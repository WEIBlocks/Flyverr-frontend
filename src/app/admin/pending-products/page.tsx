"use client"

import React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function PendingProductsPage() {
  // Placeholder mock data
  const rows = [
    { id: "p_101", title: "Web Dev Masterclass", creator: "CodeMaster Pro", submittedAt: "2025-08-01", status: "pending" },
    { id: "p_102", title: "UI/UX System", creator: "DesignStudio", submittedAt: "2025-08-02", status: "pending" },
  ]

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Pending Products</h2>
      <Card className="border-0 bg-white dark:bg-gray-800">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-50 dark:bg-gray-700/50 text-left text-gray-600 dark:text-gray-300">
                <tr>
                  <th className="px-4 py-3">ID</th>
                  <th className="px-4 py-3">Title</th>
                  <th className="px-4 py-3">Creator</th>
                  <th className="px-4 py-3">Submitted</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.id} className="border-b border-gray-100 dark:border-gray-700/50">
                    <td className="px-4 py-3 font-mono text-xs">{r.id}</td>
                    <td className="px-4 py-3">{r.title}</td>
                    <td className="px-4 py-3">{r.creator}</td>
                    <td className="px-4 py-3">{r.submittedAt}</td>
                    <td className="px-4 py-3 space-x-2">
                      <Button size="sm">Approve</Button>
                      <Button size="sm" variant="outline">Reject</Button>
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


