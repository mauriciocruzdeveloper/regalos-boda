'use client'

import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { GiftsTable } from './actions';

export interface GiftsProps {
  initialGifts: GiftsTable[];
  togglePurchased: (id: string, userId: string) => Promise<void>;
}

export default function Table({
  initialGifts: gifts,
  togglePurchased,
}: GiftsProps) {
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    let storedUserId = localStorage.getItem('userId');
    if (!storedUserId) {
      storedUserId = uuidv4();
      localStorage.setItem('userId', storedUserId);
    }
    setUserId(storedUserId);
  }, [gifts]);

  const handleTogglePurchased = (id: string, userId: string | null) => {
    if (!userId) return;

    const selectedGift = gifts.find(gift => gift.selected_by === userId);
    if (selectedGift && selectedGift.id !== id) {
      alert('Ya has seleccionado un regalo.');
      return;
    }

    togglePurchased(id, userId);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center mb-8 text-pink-600">Lista de Regalos de Boda</h1>
        <ul className="space-y-4">
          {gifts.map(gift => (
            <li key={gift.id} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg shadow">
              <span className={`text-lg ${gift.purchased ? 'line-through text-gray-400' : 'text-gray-800'}`}>
                {gift.name}
              </span>
              <button
                onClick={() => handleTogglePurchased(gift.id, userId)}
                className={`px-4 py-2 rounded-lg text-sm font-semibold ${
                  gift.purchased ? 'bg-red-500 text-white' : 'bg-green-500 text-white'
                }`}
                disabled={gift.purchased && gift.selected_by !== userId}
              >
                {gift.purchased ? (gift.selected_by === userId ? 'Desmarcar' : 'Comprometido') : 'Marcar'}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
