import { client } from "@/lib/sanity"; // your sanity client

export default async function sitemap() {
  const baseUrl = "https://thehalalexplorer.com";
  const destinations = await client.fetch(`*[_type == "destination" && defined(slug.current)]{ "slug": slug.current, _updatedAt }`);
  const blogs = await client.fetch(`*[_type == "blog" && defined(slug.current)]{ "slug": slug.current, publishedAt }`);

  const routes = [
    { url: baseUrl + "/", lastModified: new Date().toISOString() },
    ...destinations.map((d) => ({ url: `${baseUrl}/destinations/${d.slug}`, lastModified: d._updatedAt })),
    ...blogs.map((b) => ({ url: `${baseUrl}/blog/${b.slug}`, lastModified: b.publishedAt })),
  ];

  return routes;
}
