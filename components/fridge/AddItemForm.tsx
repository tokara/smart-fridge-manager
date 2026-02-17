'use client'

import { useState, FormEvent } from 'react'
import { Category } from '@/types/fridge'

interface AddItemFormProps {
  onAddItem: (item: {
    name: string
    quantity: number
    unit: string
    category: Category
    expiryDate?: Date
  }) => void
}

export default function AddItemForm({ onAddItem }: AddItemFormProps) {
  // Form state - each input field has its own state
  const [name, setName] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [unit, setUnit] = useState('pieces')
  const [category, setCategory] = useState<Category>('other')
  const [expiryDate, setExpiryDate] = useState('')

  // Handle form submission
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault() // Prevent page reload
    
    // Validate: name is required
    if (!name.trim()) {
      alert('Please enter an item name')
      return
    }

    // Call the parent function with new item data
    onAddItem({
      name: name.trim(),
      quantity,
      unit,
      category,
      expiryDate: expiryDate ? new Date(expiryDate) : undefined
    })

    // Reset form
    setName('')
    setQuantity(1)
    setUnit('pieces')
    setCategory('other')
    setExpiryDate('')
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-8">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Add New Item</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Item Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Item Name *
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g., Milk"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Quantity */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Quantity
          </label>
          <div className="flex gap-2">
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              min="0.1"
              step="0.1"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="pieces">pieces</option>
              <option value="kg">kg</option>
              <option value="g">g</option>
              <option value="liters">liters</option>
              <option value="ml">ml</option>
            </select>
          </div>
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as Category)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="dairy">🥛 Dairy</option>
            <option value="meat">🥩 Meat</option>
            <option value="vegetables">🥬 Vegetables</option>
            <option value="fruits">🍎 Fruits</option>
            <option value="beverages">🥤 Beverages</option>
            <option value="condiments">🧂 Condiments</option>
            <option value="other">📦 Other</option>
          </select>
        </div>

        {/* Expiry Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Expiry Date (optional)
          </label>
          <input
            type="date"
            value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors font-medium"
      >
        Add to Fridge
      </button>
    </form>
  )
}