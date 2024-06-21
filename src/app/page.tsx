'use client'

import { useState } from 'react';

interface Gift {
  id: number;
  name: string;
  purchased: boolean;
}

const initialGifts: Gift[] = [
  { id: 1, name: 'Vajilla', purchased: false },
  { id: 2, name: 'Juego de sábanas', purchased: false },
  { id: 3, name: 'Cafetera', purchased: false },
  { id: 4, name: 'Juego de toallas', purchased: false },
];

const Home = () => {
  const [gifts, setGifts] = useState<Gift[]>(initialGifts);

  const togglePurchased = (id: number) => {
    setGifts(gifts.map(gift =>
      gift.id === id ? { ...gift, purchased: !gift.purchased } : gift
    ));
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
                onClick={() => togglePurchased(gift.id)}
                className={`px-4 py-2 rounded-lg text-sm font-semibold ${
                  gift.purchased ? 'bg-red-500 text-white' : 'bg-green-500 text-white'
                }`}
              >
                {gift.purchased ? 'Desmarcar' : 'Marcar como comprado'}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Home;
