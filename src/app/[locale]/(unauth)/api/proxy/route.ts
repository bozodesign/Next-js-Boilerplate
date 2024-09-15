import * as cheerio from 'cheerio';
import { NextResponse } from 'next/server';
import fetch from 'node-fetch';

export async function GET() {
  try {
    // Fetch the HTML from Pantip
    const response = await fetch('https://pantip.com');
    const html = await response.text();

    // Load HTML into Cheerio
    const $ = cheerio.load(html);

    // Extract data from the HTML
    const posts: any[] = [];
    $('ul.pt-list > li.pt-list-item').each((i, element) => {
      // Extract title and link
      const title = $(element).find('.pt-list-item__title h2 a').text().trim();
      const link = $(element).find('.pt-list-item__title h2 a').attr('href');

      // Extract thumbnail image URL
      const thumbnailElement = $(element).find('.pt-list-item__img');
      let thumbnailUrl = thumbnailElement.attr('data-bg');

      if (!thumbnailUrl) {
        // Fallback to extracting from the style attribute
        const style = thumbnailElement.attr('style');
        const match = style?.match(/url\(["']?([^"']*)["']?\)/);
        if (match) {
          thumbnailUrl = match[1];
        }
      }

      const tags: any[] = [];
      $(element).find('.pt-list-item__tag a').each((j, tagElement) => {
        tags.push($(tagElement).text().trim());
      });

      // Extract the author and profile link
      const authorElement = $(element).find('.pt-list-item__info h5 a');
      const author = authorElement.text().trim();
      const authorProfileLink = authorElement.attr('href');

      // Extract comment count and votes
      const commentCount = $(element).find('.pt-li_stats-comment').text().trim();
      const votes = $(element).find('.pt-li_stats-vote').text().trim();

      posts.push({ title, link, thumbnailUrl, tags, author, authorProfileLink, commentCount, votes });
    });

    // Return the extracted data as JSON
    return NextResponse.json({ posts }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: `Error fetching data: ${error.message}` }, { status: 500 });
  }
}
