import { NextResponse } from "next/server";

const TMDB_BASE = 'https://api.themoviedb.org/3';

export async function GET(request:Request) {
    const { searchParams } = new URL(request.url);
    const title = searchParams.get("title")?.trim();

    if (!title) {
        return NextResponse.json({ results: [] });
    }

    const token = process.env.TMDB_READ_ACCESS_TOKEN;
    if(!token) {
        return NextResponse.json(
            {error: "Missing TMDB API Key"},
            {status: 500}
        );
    }
    const url = `${TMDB_BASE}/search/movie?query=${encodeURIComponent(title)}`;
    const res = await fetch(url, {
        headers: { Authorization: `Bearer ${token}`},
        next: {revalidate:3600},
    });

    if (!res.ok) {
        return NextResponse.json(
            {error: "Upstream request failed", status: res.status},
            {status:502}
        );
    }

    const data = await res.json();
    return NextResponse.json({ results: data.results ?? []})
}