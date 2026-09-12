import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    throw new Error("Missing Supabase environment variables");
  }

  return createClient(url, key);
}

export async function GET() {
  try {
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from("portfolio_ratings")
      .select("rating");

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const ratings = data ?? [];
    const total = ratings.length;
    const totalStars = ratings.reduce((sum, row) => sum + row.rating, 0);
    const average = total > 0 ? totalStars / total : 0;

    return NextResponse.json({ average, total, totalStars });
  } catch {
    return NextResponse.json(
      { error: "Ratings are not configured yet." },
      { status: 503 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const rating = Number(body.rating);

    if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: "Please select a rating from 1 to 5." },
        { status: 400 },
      );
    }

    const supabase = getSupabase();
    const { error } = await supabase
      .from("portfolio_ratings")
      .insert({ rating });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Could not submit rating." },
      { status: 503 },
    );
  }
}
