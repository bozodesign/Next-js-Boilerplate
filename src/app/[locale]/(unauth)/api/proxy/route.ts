import fetch from 'node-fetch';

export async function GET() {
  try {
    const response = await fetch('https://pantip.com');
    const data = await response.text();

    return new Response(data, {
      status: 200,
      headers: { 'Content-Type': 'text/html' },
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: `Error fetching data: ${error.message}` }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
