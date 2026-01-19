import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const posts = await getCollection('posts');
  return rss({
    title: 'Cheito Díaz | Noticias',
    description: 'Actualidad, opiniones y análisis sobre el fútbol base y regional.',
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: post.data.description,
      link: `/posts/${post.slug}/`,
      author: post.data.author,
      categories: post.data.tags, // RSS tags
    })),
    customData: `<language>es-ES</language>`,
  });
}