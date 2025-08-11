"use client"

import React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function AdminAllProductsPage() {
  const products = [
    { id: "p_401", title: "Web Dev Masterclass", creator: "CodeMaster Pro", stage: "newboom", price: 299 },
    { id: "p_402", title: "UI/UX System", creator: "DesignStudio", stage: "blossom", price: 149 },
  ]

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">All Products</h2>
      <Card className="border-0 bg-white dark:bg-gray-800">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-50 dark:bg-gray-700/50 text-left text-gray-600 dark:text-gray-300">
                <tr>
                  <th className="px-4 py-3">ID</th>
                  <th className="px-4 py-3">Title</th>
                  <th className="px-4 py-3">Creator</th>
                  <th className="px-4 py-3">Stage</th>
                  <th className="px-4 py-3">Price</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr key={p.id} className="border-b border-gray-100 dark:border-gray-700/50">
                    <td className="px-4 py-3 font-mono text-xs">{p.id}</td>
                    <td className="px-4 py-3">{p.title}</td>
                    <td className="px-4 py-3">{p.creator}</td>
                    <td className="px-4 py-3 capitalize">{p.stage}</td>
                    <td className="px-4 py-3">${p.price}</td>
                    <td className="px-4 py-3 space-x-2">
                      <Button size="sm">Edit</Button>
                      <Button size="sm" variant="outline">Disable</Button>
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


