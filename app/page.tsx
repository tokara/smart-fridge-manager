'use client'

import { useFridge } from '@/hooks/useFridge'
import AddItemForm from '@/components/fridge/AddItemForm'
import FridgeItemCard from '@/components/fridge/FridgeItemCard'

export default function Home() {
  // Get items and functions from our custom hook
  const { items, addItem, deleteItem } = useFridge()

  return (
    <main className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          🍎 Smart Fridge Manager
        </h1>
        <p className="text-gray-600 mb-8">
          Keep track of your food and never waste again
        </p>

        {/* Add Item Form */}
        <AddItemForm onAddItem={addItem} />

        {/* Item Count */}
        <div className="mb-4">
          <h2 className="text-2xl font-bold text-gray-800">
            Your Fridge ({items.length} items)
          </h2>
        </div>

        {/* Item List */}
        {items.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <p className="text-gray-500 text-lg">Your fridge is empty!</p>
            <p className="text-gray-400">Add your first item above</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {items.map(item => (
              <FridgeItemCard
                key={item.id}
                item={item}
                onDelete={deleteItem}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  )
}