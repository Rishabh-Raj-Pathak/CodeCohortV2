import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const userId = req.headers.get('user-id'); // Assume user ID is sent in headers

  if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
  }

  const response = await fetch(`http://localhost:5000/recommendations/${userId}`);
  
  if (!response.ok) {
      return NextResponse.json({ error: 'Failed to fetch recommendations' }, { status: 500 });
  }

  const recommendedRooms = await response.json();
  
  return NextResponse.json(recommendedRooms);
}