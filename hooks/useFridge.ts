'use client' // This tells Next.js this code runs in the browser

import { useState, useEffect } from 'react'
import { FridgeItem } from '@/types/fridge'

export function useFridge() {
  // State: array of fridge items
  const [items, setItems] = useState<FridgeItem[]>([])

  // Load items from localStorage when component mounts
  useEffect(() => {
    const saved = localStorage.getItem('fridgeItems')
    if (saved) {
      const parsed = JSON.parse(saved)
      // Convert date strings back to Date objects
      const itemsWithDates = parsed.map((item: any) => ({
        ...item,
        addedDate: new Date(item.addedDate),
        expiryDate: item.expiryDate ? new Date(item.expiryDate) : undefined
      }))
      setItems(itemsWithDates)
    }
  }, []) // Empty array = run only once on mount

  // Save to localStorage whenever items change
  useEffect(() => {
    localStorage.setItem('fridgeItems', JSON.stringify(items))
  }, [items]) // Run whenever 'items' changes

  // Function to add a new item
  const addItem = (item: Omit<FridgeItem, 'id' | 'addedDate'>) => {
    const newItem: FridgeItem = {
      ...item,
      id: crypto.randomUUID(), // Generate unique ID
      addedDate: new Date()
    }
    setItems(prev => [...prev, newItem]) // Add to existing items
  }

  // Function to delete an item
  const deleteItem = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id))
  }

  // Return items and functions so components can use them
  return {
    items,
    addItem,
    deleteItem
  }
}