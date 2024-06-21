'use server'

import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { unstable_noStore as noStore } from 'next/cache';

export type GiftsTable = {
  id: string;
  name: string;
  purchased: boolean;
  selected_by: string | null;
};

export async function fetchGifts() {
  noStore();
  try {
    const gifts = await sql<GiftsTable>`
      SELECT
        gifts.id,
        gifts.name,
        gifts.purchased,
        gifts.selected_by
      FROM gifts
      ORDER BY gifts.id DESC
    `;
    return gifts.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch gifts.');
  }
}

export async function togglePurchased(id: string, userId: string) {
  try {
    const gift = await sql<GiftsTable>`
      SELECT
        gifts.id,
        gifts.name,
        gifts.purchased,
        gifts.selected_by
      FROM gifts
      WHERE gifts.id = ${id}
    `;

    if (gift.rows.length === 0) {
      throw new Error('Gift not found.');
    }

    await sql<GiftsTable>`
      UPDATE gifts
      SET
        purchased = NOT gifts.purchased,
        selected_by = CASE
          WHEN gifts.purchased THEN NULL
          ELSE ${userId}
        END
      WHERE gifts.id = ${id}
      RETURNING *
    `;

    revalidatePath('/');
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to toggle gift.');
  }
}