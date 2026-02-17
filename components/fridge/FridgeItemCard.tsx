'use client'

import { FridgeItem } from '@/types/fridge'

interface FridgeItemCardProps {
  item: FridgeItem
  onDelete: (id: string) => void
}

export default function FridgeItemCard({ item, onDelete }: FridgeItemCardProps) {
  // Calculate days until expiry
  const getDaysUntilExpiry = () => {
    if (!item.expiryDate) return null
    const now = new Date()
    const expiry = new Date(item.expiryDate)
    const diffTime = expiry.getTime() - now.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  const daysLeft = getDaysUntilExpiry()

  // Determine color based on days left
  const getExpiryColor = () => {
    if (daysLeft === null) return 'bg-gray-100'
    if (daysLeft < 0) return 'bg-red-100 border-red-300'
    if (daysLeft <= 3) return 'bg-orange-100 border-orange-300'
    if (daysLeft <= 7) return 'bg-yellow-100 border-yellow-300'
    return 'bg-green-100 border-green-300'
  }

  return (
    <div className={`p-4 rounded-lg border-2 ${getExpiryColor()}`}>
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
          <p className="text-sm text-gray-600">
            {item.quantity} {item.unit} • {item.category}
          </p>
          {daysLeft !== null && (
            <p className="text-sm font-medium mt-1">
              {daysLeft < 0 
                ? '⚠️ Expired!' 
                : daysLeft === 0 
                ? '⚠️ Expires today!' 
                : `📅 ${daysLeft} days left`
              }
            </p>
          )}
        </div>
        <button
          onClick={() => onDelete(item.id)}
          className="ml-4 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors text-sm"
        >
          Delete
        </button>
      </div>
    </div>
  )
}