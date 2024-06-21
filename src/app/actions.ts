'use server'

import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export type GiftsTable = {
  id: string;
  name: string;
  purchased: boolean;
  selected_by: string | null;
};

export async function fetchGifts() {
  try {
    const invoices = await sql<GiftsTable>`
      SELECT
        gifts.id,
        gifts.name,
        gifts.purchased,
        gifts.selected_by
      FROM gifts
      ORDER BY gifts.name DESC
    `;

    return invoices.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoices.');
  }
}

export async function togglePurchased(id: string, userId: string) {
  // try {
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

    if (gift.rows[0].selected_by && gift.rows[0].selected_by !== userId) {
      throw new Error('You have already selected a gift.');
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
    redirect('/');
  // } catch (error) {
  //   console.error('Database Error:', error);
  //   throw new Error('Failed to toggle gift.');
  // }
}