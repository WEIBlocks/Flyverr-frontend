"use client"

import React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function StaleResalesPage() {
  // Products not resold in last 30 days; some may have insurance
  const rows = [
    { id: "p_301", title: "Marketing Guide", lastResale: "2025-07-01", insured: true, currentRound: 2 },
    { id: "p_302", title: "Stock Photo Pack", lastResale: "2025-06-29", insured: false, currentRound: 1 },
  ]

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Products Not Resold (30 days)</h2>
      <Card className="border-0 bg-white dark:bg-gray-800">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-50 dark:bg-gray-700/50 text-left text-gray-600 dark:text-gray-300">
                <tr>
                  <th className="px-4 py-3">Product ID</th>
                  <th className="px-4 py-3">Title</th>
                  <th className="px-4 py-3">Last Resale</th>
                  <th className="px-4 py-3">Insured</th>
                  <th className="px-4 py-3">Round</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.id} className="border-b border-gray-100 dark:border-gray-700/50">
                    <td className="px-4 py-3 font-mono text-xs">{r.id}</td>
                    <td className="px-4 py-3">{r.title}</td>
                    <td className="px-4 py-3">{r.lastResale}</td>
                    <td className="px-4 py-3">{r.insured ? 'Yes' : 'No'}</td>
                    <td className="px-4 py-3">{r.currentRound}</td>
                    <td className="px-4 py-3 space-x-2">
                      <Button size="sm">Trigger Insurance Resale</Button>
                      <Button size="sm" variant="outline">Notify Owner</Button>
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


