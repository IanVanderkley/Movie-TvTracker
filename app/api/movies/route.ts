import { NextRequest,NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get('query');

    if (!query) {
        return NextResponse.json({ results: []});
    }

    const res = await fetch(
        `https://themoviedb.org{encodeURIComponent(query)}&include_adult=false&language=en-US&page=1`,
        {
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${process.env.TMDB_READ_ACCESS_TOKEN}`

            },
        }
    );

    if (!res.ok){
        return NextResponse.json({ error: 'Failed to fetch from TMDB'}, {status:res.status});
    }
    const data = await res.json();
    return NextResponse.json(data);
}