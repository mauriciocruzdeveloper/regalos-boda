"use client";

import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { GiftsTable } from "./actions";

export interface GiftsProps {
  initialGifts: GiftsTable[];
  togglePurchased: (id: string, userId: string) => Promise<void>;
}

export default function Table({
  initialGifts: gifts,
  togglePurchased,
}: GiftsProps) {
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState<string>();

  useEffect(() => {
    let storedUserId = localStorage.getItem("userId");
    if (!storedUserId) {
      storedUserId = uuidv4();
      localStorage.setItem("userId", storedUserId);
    }
    setUserId(storedUserId);
  }, [gifts]);

  const handleTogglePurchased = async (id: string, userId: string | null) => {
    if (!userId) return;

    const selectedGift = gifts.find((gift) => gift.selected_by === userId);
    if (selectedGift && selectedGift.id !== id) {
      alert("Ya has seleccionado un regalo.");
      return;
    }

    setLoading(id);
    await togglePurchased(id, userId);
    setLoading(undefined);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center mb-8 text-customGold">
          Sugerencias de Regalos
        </h1>
        <ul className="space-y-4">
          {gifts.map((gift) => (
            <li
              key={gift.id}
              className="flex justify-between items-center p-4 bg-gray-50 rounded-lg shadow"
            >
              <span
                className={`w-3/4 text-lg ${
                  gift.purchased
                    ? "line-through text-gray-400"
                    : "text-gray-800"
                }`}
              >
                {gift.name}
              </span>
              <button
                onClick={() => handleTogglePurchased(gift.id, userId)}
                className={`w-3/12 min-w-32 px-4 py-2 rounded-lg text-sm font-semibold ${
                  gift.purchased
                    ? "bg-customLightGreen text-white"
                    : "bg-customOlive text-white"
                }`}
                disabled={gift.purchased && gift.selected_by !== userId || loading === gift.id}
              >
                {loading ? "Cargando..." : gift.purchased
                  ? gift.selected_by === userId
                    ? "Desmarcar"
                    : "Comprometido"
                  : "Marcar"}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
