import Image from "next/image";
import { notFound } from "next/navigation";
import { Container, Chip, Box, Typography, Divider } from "@mui/material";
import RichText from "@/components/RichText";
import { getAllBlogSlugs, getBlogBySlug } from "@/lib/sanity/queries";

export const revalidate = 60; // ISR

type PageProps = {
  params: { slug: string };
};

export async function generateStaticParams() {
  const slugs = await getAllBlogSlugs();
  return (slugs || []).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const post = await getBlogBySlug(params.slug);
  if (!post) return {};
  return {
    title: post.metaTitle || post.title,
    description: post.metaDescription || post.shortDescription,
    openGraph: {
      title: post.metaTitle || post.title,
      description: post.metaDescription || post.shortDescription,
      images: post?.mainImage?.asset?.url ? [{ url: post.mainImage.asset.url }] : [],
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const post = await getBlogBySlug(params.slug);
  if (!post) return notFound();

  return (
    <>
      {/* Hero Header */}
      <Box sx={{ position: "relative", height: { xs: 300, md: 420 }, overflow: "hidden", mb: 4 }}>
        {post?.mainImage?.asset?.url && (
          <Image
            src={post.mainImage.asset.url}
            alt={post.title}
            fill
            style={{ objectFit: "cover" }}
            priority
          />
        )}
        <Box sx={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.25), rgba(0,0,0,0.75))" }} />
        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1, height: "100%", display: "flex", alignItems: "flex-end" }}>
          <Box sx={{ py: 4 }}>
            <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mb: 1 }}>
              {Array.isArray(post.categories) && post.categories.map((cat: string) => (
                <Chip key={cat} size="small" label={cat} color="secondary" />
              ))}
            </Box>
            <Typography variant="h2" component="h1" sx={{ color: "white", fontWeight: 700, mb: 1 }}>
              {post.title}
            </Typography>
            <Box sx={{ display: "flex", gap: 2, alignItems: "center", color: "rgba(255,255,255,0.9)" }}>
              {post.author && (
                <Typography variant="body2">By {post.author}</Typography>
              )}
              {post.publishedAt && (
                <Typography variant="body2" component="time" dateTime={post.publishedAt}>
                  {new Date(post.publishedAt).toLocaleDateString()}
                </Typography>
              )}
            </Box>
          </Box>
        </Container>
      </Box>

      <Container maxWidth="lg">
        {/* Optional excerpt */}
        {post.shortDescription && (
          <Typography variant="h6" sx={{ mb: 3, color: "text.secondary" }}>{post.shortDescription}</Typography>
        )}
        <Divider sx={{ mb: 4 }} />

        <article className="prose prose-neutral max-w-none">
          {post?.body && <RichText value={post.body} />}
        </article>
      </Container>
    </>
  );
}


