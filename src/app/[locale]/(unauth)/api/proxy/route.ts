import { NextApiRequest, NextApiResponse } from 'next';
import fetch from 'node-fetch';

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  try {
    const response = await fetch('https://pantip.com');
    const data = await response.text();
    return Response.json(data);
  } catch (error) {
    return Response.json({ error: 'Error fetching data' });
  }
}
