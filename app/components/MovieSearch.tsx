'use client';

import { useState } from "react";
import AddToWatchlistButton from "./AddToWatchlistButton";
import CreateReviewButton from "./CreateReviewButton";
interface Movie {
    id:number;
    title:string;
    overview:string;
    release_date?: string;
}

export default function MovieSearch() {
    const [movies,setMovies] = useState<Movie[]>([]);
    const [query,setQuery] = useState("");
    const [loading,setLoading] = useState(false);
    const [error,setError] = useState<string | null>(null);

    async function searchHandler(e: React.SubmitEvent) {
        e.preventDefault();
        if (!query.trim()) return;
        setLoading(true);
        setError(null);
        try {
            const res = await fetch(`/api/movies?title=${encodeURIComponent(query)}`);
            if (!res.ok) throw new Error(`Request failed (${res.status})`);
            const data = await res.json();
            setMovies(data.results);
        }catch (err) {
            setError(err instanceof Error ? err.message : "Something went wrong");
            setMovies([]);
        } finally {
            setLoading(false)
        }
    }

    return (
        <div style={{ maxWidth: 640, margin: "3rem auto", padding: "0 1rem" }}>
            <h1>Search Movies</h1>
            <form onSubmit={searchHandler} style={{ display: "flex", gap: 8 }}>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Blade Runner"
          style={{ flex: 1, padding: 8 }}
        />
        <button type="submit" disabled={loading}>
          {loading ? "Searching…" : "Search"}
        </button>
        </form>
        {error && <p style={{ color: "crimson" }}>{error}</p>}
        <ul>
        {movies.map((movie) => (
          <li key={movie.id}>
            <strong>{movie.title}</strong>
            {movie.release_date ? ` (${movie.release_date.slice(0, 4)})` : ""}
            {movie.overview ? ` — ${movie.overview}` : ""}
            <AddToWatchlistButton id={movie.id}/>
            <CreateReviewButton id={movie.id}/>
          </li>
         ))}
        </ul>
        </div>
    )
}