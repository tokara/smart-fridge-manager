'use client'

import { FridgeItem } from '@/types/fridge'

interface StatsCardsProps {
  items: FridgeItem[]
}

export default function StatsCards({ items }: StatsCardsProps) {
  // Count each category of items
  const total = items.length

  const expired = items.filter(item => {
    if (!item.expiryDate) return false
    const days = Math.ceil(
      (new Date(item.expiryDate).getTime() - new Date().getTime())
      / (1000 * 60 * 60 * 24)
    )
    return days < 0
  }).length

  const expiringSoon = items.filter(item => {
    if (!item.expiryDate) return false
    const days = Math.ceil(
      (new Date(item.expiryDate).getTime() - new Date().getTime())
      / (1000 * 60 * 60 * 24)
    )
    return days >= 0 && days <= 3
  }).length

  const fresh = items.filter(item => {
    if (!item.expiryDate) return true
    const days = Math.ceil(
      (new Date(item.expiryDate).getTime() - new Date().getTime())
      / (1000 * 60 * 60 * 24)
    )
    return days > 3
  }).length

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      <div className="bg-white rounded-lg shadow p-4 text-center">
        <p className="text-3xl font-bold text-gray-800">{total}</p>
        <p className="text-sm text-gray-500 mt-1">🧺 Total Items</p>
      </div>
      <div className="bg-green-50 rounded-lg shadow p-4 text-center">
        <p className="text-3xl font-bold text-green-600">{fresh}</p>
        <p className="text-sm text-gray-500 mt-1">✅ Fresh</p>
      </div>
      <div className="bg-orange-50 rounded-lg shadow p-4 text-center">
        <p className="text-3xl font-bold text-orange-500">{expiringSoon}</p>
        <p className="text-sm text-gray-500 mt-1">⚠️ Expiring Soon</p>
      </div>
      <div className="bg-red-50 rounded-lg shadow p-4 text-center">
        <p className="text-3xl font-bold text-red-500">{expired}</p>
        <p className="text-sm text-gray-500 mt-1">🚨 Expired</p>
      </div>
    </div>
  )
}