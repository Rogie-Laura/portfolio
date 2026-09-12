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
      .from("portfolio_reviews")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ reviews: data ?? [] });
  } catch {
    return NextResponse.json(
      { error: "Reviews are not configured yet." },
      { status: 503 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const reviewerName = String(body.reviewerName ?? "").trim();
    const relationship = String(body.relationship ?? "").trim();
    const projectName = String(body.projectName ?? "").trim();
    const message = String(body.message ?? "").trim();
    const rating = Number(body.rating);

    if (!reviewerName || reviewerName.length < 2) {
      return NextResponse.json(
        { error: "Please enter your name." },
        { status: 400 },
      );
    }

    if (!relationship) {
      return NextResponse.json(
        { error: "Please select your relationship." },
        { status: 400 },
      );
    }

    if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: "Please select a rating from 1 to 5." },
        { status: 400 },
      );
    }

    if (!message || message.length < 10) {
      return NextResponse.json(
        { error: "Please write at least 10 characters in your message." },
        { status: 400 },
      );
    }

    const supabase = getSupabase();
    const { data, error } = await supabase
      .from("portfolio_reviews")
      .insert({
        reviewer_name: reviewerName,
        relationship,
        project_name: projectName || null,
        rating,
        message,
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ review: data }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Could not submit review." },
      { status: 503 },
    );
  }
}
