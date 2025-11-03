import Image from "next/image";
import Link from "next/link";
import { Box, Chip, Container, Typography, Paper } from "@mui/material";
import { getAllBlogPosts } from "@/lib/sanity/queries";

export const revalidate = 60; // ISR

export default async function BlogIndexPage() {
  const posts = await getAllBlogPosts();
  const featured = Array.isArray(posts) && posts.length > 0 ? posts[0] : null;
  const rest = Array.isArray(posts) && posts.length > 1 ? posts.slice(1) : [];

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl md:text-4xl font-bold mb-6">Blog</h1>
      <p className="text-muted-foreground mb-6">Insights, guides, and halal-friendly travel stories.</p>

      {featured && (
        <Box sx={{ mb: 6 }}>
          <Paper sx={{ position: "relative", height: { xs: 300, md: 420 }, borderRadius: 2, overflow: "hidden" }}>
            {featured?.mainImage?.asset?.url && (
              <Link href={`/blog/${featured.slug?.current}`}>
                <Image
                  src={featured.mainImage.asset.url}
                  alt={featured.title}
                  fill
                  style={{ objectFit: "cover" }}
                  priority
                />
              </Link>
            )}
            <Box sx={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.25), rgba(0,0,0,0.75))" }} />
            <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1, height: "100%", display: "flex", alignItems: "flex-end" }}>
              <Box sx={{ py: 3 }}>
                <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mb: 1 }}>
                  {Array.isArray(featured.categories) && featured.categories.map((cat: string) => (
                    <Chip key={cat} size="small" label={cat} color="secondary" />
                  ))}
                </Box>
                <Typography component={Link} href={`/blog/${featured.slug?.current}`} variant="h3" sx={{ color: "#fff", fontWeight: 700, textDecoration: "none" }}>
                  {featured.title}
                </Typography>
                <Box sx={{ display: "flex", gap: 2, alignItems: "center", color: "rgba(255,255,255,0.9)", mt: 1 }}>
                  {featured.publishedAt && (
                    <Typography variant="body2" component="time" dateTime={featured.publishedAt}>
                      {new Date(featured.publishedAt).toLocaleDateString()}
                    </Typography>
                  )}
                  {featured.author && (
                    <Typography variant="body2">• {featured.author}</Typography>
                  )}
                </Box>
                {featured.shortDescription && (
                  <Typography variant="body1" sx={{ color: "rgba(255,255,255,0.9)", mt: 1, maxWidth: 900 }}>
                    {featured.shortDescription}
                  </Typography>
                )}
              </Box>
            </Container>
          </Paper>
        </Box>
      )}

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {rest?.map((post: any) => (
          <article key={post._id} className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
            {post?.mainImage?.asset?.url && (
              <Link href={`/blog/${post.slug?.current}`}> 
                <Image
                  src={post.mainImage.asset.url}
                  alt={post.title}
                  width={600}
                  height={400}
                  className="h-48 w-full object-cover"
                />
              </Link>
            )}
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">
                <Link href={`/blog/${post.slug?.current}`}>{post.title}</Link>
              </h2>
              {Array.isArray(post.categories) && post.categories.length > 0 && (
                <div className="mb-2 flex flex-wrap gap-1">
                  {post.categories.map((cat: string) => (
                    <Chip key={cat} size="small" label={cat} color="secondary" />
                  ))}
                </div>
              )}
              {post.shortDescription && (
                <p className="text-sm text-muted-foreground line-clamp-3">{post.shortDescription}</p>
              )}
              <div className="mt-4 text-xs text-muted-foreground">
                {post.publishedAt && (
                  <time dateTime={post.publishedAt}>
                    {new Date(post.publishedAt).toLocaleDateString()}
                  </time>
                )}
                {post.author && (
                  <span className="ml-2">• {post.author}</span>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}


