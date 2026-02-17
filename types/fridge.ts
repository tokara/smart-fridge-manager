// This defines what categories our items can have
export type Category = 
  | 'dairy'
  | 'meat'
  | 'vegetables'
  | 'fruits'
  | 'beverages'
  | 'condiments'
  | 'other';

// This defines the structure of a fridge item
export interface FridgeItem {
  id: string;           // Unique ID (we'll generate this)
  name: string;         // Item name like "Milk"
  quantity: number;     // How many/much
  unit: string;         // "liters", "pieces", "kg", etc.
  category: Category;   // One of the categories above
  addedDate: Date;      // When it was added
  expiryDate?: Date;    // Optional - might not have expiry
}