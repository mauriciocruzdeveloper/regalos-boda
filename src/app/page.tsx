import Table from "./table";
import { fetchGifts, togglePurchased } from "./actions";

export default async function Home() {
  const giftsPromise = Promise.all([fetchGifts()]);

  const [gifts] = await giftsPromise;

  return (
      <Table
        initialGifts={gifts}
        togglePurchased={togglePurchased}
      />
  )
};

