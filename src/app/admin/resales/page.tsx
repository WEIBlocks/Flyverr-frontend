"use client"

import React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function AdminResalesPage() {
  const listings = [
    { id: "r_201", product: "Web Dev Masterclass", round: 1, targetPrice: 299, licensesSold: 100, totalLicenses: 100 },
    { id: "r_202", product: "UI/UX System", round: 2, targetPrice: 179, licensesSold: 50, totalLicenses: 75 },
  ]

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Resale Listing Creation</h2>
      <Card className="border-0 bg-white dark:bg-gray-800">
        <CardContent className="p-4 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input placeholder="Product ID or name" />
            <Input type="number" placeholder="Round (e.g. 1, 2)" />
            <Input type="number" placeholder="Set Price (USD)" />
          </div>
          <div className="flex gap-2">
            <Button>Create Resale Round</Button>
            <Button variant="outline">Auto Trigger Rules</Button>
          </div>
        </CardContent>
      </Card>

      <h3 className="text-lg font-semibold">Active/Recent Resales</h3>
      <Card className="border-0 bg-white dark:bg-gray-800">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-50 dark:bg-gray-700/50 text-left text-gray-600 dark:text-gray-300">
                <tr>
                  <th className="px-4 py-3">ID</th>
                  <th className="px-4 py-3">Product</th>
                  <th className="px-4 py-3">Round</th>
                  <th className="px-4 py-3">Set Price</th>
                  <th className="px-4 py-3">Sold</th>
                  <th className="px-4 py-3">Total</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {listings.map((l) => (
                  <tr key={l.id} className="border-b border-gray-100 dark:border-gray-700/50">
                    <td className="px-4 py-3 font-mono text-xs">{l.id}</td>
                    <td className="px-4 py-3">{l.product}</td>
                    <td className="px-4 py-3">{l.round}</td>
                    <td className="px-4 py-3">${l.targetPrice}</td>
                    <td className="px-4 py-3">{l.licensesSold}</td>
                    <td className="px-4 py-3">{l.totalLicenses}</td>
                    <td className="px-4 py-3 space-x-2">
                      <Button size="sm">Edit</Button>
                      <Button size="sm" variant="outline">Close</Button>
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


