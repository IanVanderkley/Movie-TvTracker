'use client';

import { useState } from "react";

interface Movie {
    id:number;
    title: string;
    release_date: string;
    poster_path: string | null;
}
 //search function
export default function MovieSearch() {
    const [query, setQuery] = useState('');
    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(false);

    const handleSearch = async (e: React.ChangeEvent) => {
        e.preventDefault();
        if (!query.trim()) return;

        setLoading(true);
        try{
            const res = await fetch(`/api/movies?query=${encodeURIComponent(query)}`);
            const data = await res.json();
            setMovies(data.results || []);
        }catch (error){
            console.error('Search Error:', error)
        }finally{
            setLoading(false);
        }
    };

    //html component
    return (
        <div className="p-6 max-w-4xl mx-auto">
            <form onSubmit={handleSearch} className="flex gap-2 mb-6">
                <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for a movie..."
                className="border p-2 rounded flex-1 text-black"
                />
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
                    {loading ? 'Searching...' : 'Search'}
                </button>
            </form>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {movies.map((movie) => (
                    <div key={movie.id} className="border rounded p-2">
                        {movie.poster_path ? (
                            <img
                            src={`https://tmdb.org{movie.poster_path}`}
                            alt={movie.title}
                            className="w-full h-auto rounded mb-2"
                            />
                        ):(
                            <div className="w-full aspect-[2/3] bg-gray-200 flex items-center justify-center rounded mb-2 text-gray-500">
                            No Image
                            </div>
                        )}
                        <h3 className="font-bold text-sm">{movie.title}</h3>
                        <p className="text-xs text-gray-500">{movie.release_date?.slice(0, 4)}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}