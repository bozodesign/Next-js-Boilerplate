import { NextRequest, NextResponse } from 'next/server';
import fetch from 'node-fetch';

export async function POST(req: NextRequest) {
  try {
    // Extract the request body
    const requestBody = await req.json();
    console.log('Request body:', requestBody);
    // Forward the request to the external API
    const response = await fetch('https://pantip.com/api/search-service/search/query', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        
      },
      body: JSON.stringify(requestBody),
    });

    // Get the response data
    const data = await response.json();

    // Return the data as JSON
    console.log('Response data:', data);
    return NextResponse.json(data, { status: response.status });
  } catch (error: any) {
    console.log('Error fetching data:', error.message);
    return NextResponse.json({ error: `Error fetching data: ${error.message}` }, { status: 500 });
  }
}
