import Table from "./table";
import { fetchGifts, togglePurchased } from "./actions";
import { Suspense } from "react";

const mockGifts = [
  {
    id: 1,
    name: 'Cubiertos de plata',
    purchased: false,
    selectedBy: null
  },
  {
    id: 2,
    name: 'Vajilla de porcelana',
    purchased: false,
    selectedBy: null
  },
  {
    id: 3,
    name: 'Cristalería fina',
    purchased: false,
    selectedBy: null
  },
  {
    id: 4,
    name: 'Cubertería de oro',
    purchased: false,
    selectedBy: null
  },
  {
    id: 5,
    name: 'Juego de café',
    purchased: false,
    selectedBy: null
  },
  {
    id: 6,
    name: 'Juego de té',
    purchased: false,
    selectedBy: null
  },
  {
    id: 7,
    name: 'Cubertería de plata',
    purchased: false,
    selectedBy: null
  },
  {
    id: 8,
    name: 'Vajilla de cerámica',
    purchased: false,
    selectedBy: null
  },
  {
    id: 9,
    name: 'Cristalería de colores',
    purchased: false,
    selectedBy: null
  },
  {
    id: 10,
    name: 'Cubertería de acero',
    purchased: false,
    selectedBy: null
  }
];

export default async function Home() {
  const gifts = await fetchGifts();

  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <Table
        initialGifts={gifts}
        togglePurchased={togglePurchased}
      />
    </Suspense>
  )
};

