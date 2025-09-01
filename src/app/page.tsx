import { Metadata } from 'next';

import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  Card,
  CardMedia,
  CardContent,
  TextField,
  Paper,
  Link
} from '@mui/material';

import { PortableText } from "@portabletext/react";
import _get from 'lodash/get';
import DestinationAutocomplete from '@/components/DestinationAutocomplete';
import { getFeaturedDestinations, getHomepageData } from '@/lib/sanity/queries';
import { Destination } from "@/types";
import { AdBanner } from "@/components/AdBanner"

export function getMetadata(homepageData: any): Metadata {
  return {
    title: homepageData?.metaTitle || "Default Title",
    description: homepageData?.metaDescription || "Default description",
    keywords: homepageData?.metaKeywords || [],
    openGraph: {
      title: homepageData?.metaTitle || "Default Title",
      description: homepageData?.metaDescription || "Default description",
      images: homepageData?.heroImage?.asset?.url
        ? [{ url: homepageData.heroImage.asset.url, width: 1200, height: 630 }]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title: homepageData?.metaTitle || "Default Title",
      description: homepageData?.metaDescription || "Default description",
      images: homepageData?.heroImage?.asset?.url
        ? [homepageData.heroImage.asset.url]
        : [],
    },
  };
}


export default async function HomePage() {
  // Fetching homepage data from Sanity

  const homepageData = await getHomepageData();
  
  const featureDestinations = await getFeaturedDestinations();
  const heroImage = homepageData.heroImage?.asset?.url || 'https://source.unsplash.com/1600x900/?travel,muslim';
  const aboutSection = _get(homepageData, 'aboutSection', '');
  return (
    <>
      {/* Hero Section */}
      <div
        style={{
          height: '60vh',
          backgroundImage: `url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
        }}
      >
        <Container maxWidth="lg" className='hero-content'>
          <Typography variant="h3" color="white" gutterBottom>
            Discover Muslim-Friendly Destinations
          </Typography>
          <Paper
            sx={{ p: '4px 8px', display: 'flex', alignItems: 'center', mt: 2 }}
          >
            <DestinationAutocomplete destinations={featureDestinations} />
          </Paper>
        </Container>
      </div>

      <Container maxWidth="lg" className='featured-content' sx={{ py: 4 }}>
        <Typography variant="h3" gutterBottom>
          Featured Destinations
        </Typography>
        <Grid container spacing={4} sx={{ py: 4 }}>
          {featureDestinations.map((place: Destination) => (
            <Grid key={place._id} size={4}>
              <Card>
                <Link href={`/destinations/${place.slug.current}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <CardMedia
                  component="img"
                  height="180"
                  image={_get(place, 'image.asset.url', 'https://source.unsplash.com/1600x900/?travel,muslim')}
                  alt={place.name}
                />
                <CardContent>
                  <Typography variant="h6">{place.name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {place.description}
                  </Typography>
                </CardContent>
                </Link>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* About Section */}
      <Box sx={{ bgcolor: '#f5f5f5', py: 6 }}>
        <Container>
          <Typography variant="h4" gutterBottom>
            About The Halal Explorer
          </Typography>
          <PortableText
            value={aboutSection}
            components={{
              types: {},
              marks: {
                strong: ({ children }) => <strong className="text-green-700">{children}</strong>,
              },
              block: {
                h3: ({ children }) => <h3 className="text-2xl font-bold mb-2">{children}</h3>,
                h4: ({ children }) => <h4 className="text-xl font-semibold mb-2">{children}</h4>,
                normal: ({ children }) => <p className="mb-4">{children}</p>,
              },
              list: {
                bullet: ({ children }) => <ul className="list-disc pl-6">{children}</ul>,
              },
              listItem: {
                bullet: ({ children }) => <li className="mb-2">{children}</li>,
              },
            }}
          />
        </Container>
      </Box>

      {/* Newsletter Section */}
      <Box sx={{ py: 6 }}>
        <Container>
          <Typography variant="h5" gutterBottom>
            Stay Updated
          </Typography>
          <Typography variant="body2" sx={{ mb: 2 }}>
            Subscribe to our newsletter to receive travel tips, destination
            highlights, and more.
          </Typography>
          <Box component="form" sx={{ display: 'flex', maxWidth: 400 }}>
            <TextField fullWidth label="Your email" variant="outlined" size="small" />
            <Button variant="contained" sx={{ ml: 2 }}>
              Subscribe
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Footer */}
        <Container className='footer'>
          <Typography variant="body2" color='text.secondary' align="center" sx={{ py: 2 }}>
            &copy; {new Date().getFullYear()} The Halal Explorer. All rights
            reserved.
          </Typography>
        </Container>
    </>
  );
}