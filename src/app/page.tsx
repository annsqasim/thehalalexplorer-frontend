import {
  AppBar,
  Box,
  Button,
  Container,
  Grid,
  InputBase,
  Toolbar,
  Typography,
  Card,
  CardMedia,
  CardContent,
  TextField,
  Paper,
} from '@mui/material';
import { Search } from '@mui/icons-material';

import { client } from '@/lib/sanity';
import { urlFor } from '@/lib/imageBuilder';
import Image from 'next/image';
import _get from 'lodash/get';


export default async function HomePage() {
  // Fetching homepage data from Sanity
  const query = `*[_type == "homepage"][0]{
    title,
    subtitle,
    description,
    aboutSection,
    metaTitle,
    metaDescription,
    metaKeywords,
    heroImage,
    heroImage {
      asset->{
        _id,
        url
      }
    }
  }`;

  const destinationQuery = `*[_type == "destination"]{
    _id,
    name,
    country,
    slug,
    description,
    halalFoodInfo,
    prayerFacilities,
    bestTimeToVisit,
    image{
      asset->{
        url
      }
    }
  }`;

  type Destination = {
    _id: string;
    name: string;
    country: string;
    slug: string;
    description: string;
    halalFoodInfo: string;
    prayerFacilities: string;
    bestTimeToVisit: string;
    image: {
      asset: {
        url: string;
      };
    };
  };

  const destinations: Destination[] = await client.fetch(destinationQuery);

  const homepageData = await client.fetch(query);
  console.log('homepageData', homepageData, destinations);
  const heroImage = homepageData.heroImage?.asset?.url || 'https://source.unsplash.com/1600x900/?travel,muslim';

  return (
    <>
      {/* Navbar */}
      {/* <AppBar position="static" color="transparent" elevation={0}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            The Halal Explorer
          </Typography>
          <Button color="inherit">Home</Button>
          <Button color="inherit">Destinations</Button>
          <Button color="inherit">About</Button>
          <Button color="inherit">Contact</Button>
        </Toolbar>
      </AppBar> */}

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
            component="form"
            sx={{ p: '4px 8px', display: 'flex', alignItems: 'center', mt: 2 }}
          >
        </Paper>
      </Container>
      </div>

      <Container maxWidth="lg" className='featured-content'>
        <Typography variant="h3" gutterBottom>
          Featured Destinations
        </Typography>
        <Grid container spacing={4} sx={{ py: 4 }}>
          {destinations.slice(0,3).map((place: Destination, index) => (
            <Grid key={index} size={4}>
              <Card>
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
          <Typography variant="body1">
            The Halal Explorer is your ultimate companion for planning
            Muslim-friendly travel experiences around the globe. Whether
            you're looking for halal food, mosques, or prayer times, we’ve got
            you covered.
          </Typography>
        </Container>
      </Box>

      {/* Newsletter Section */}
      {/* <Box sx={{ py: 6 }}>
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
      </Box> */}

      {/* Footer */}
        <Container>
          <Typography variant="body2">
            &copy; {new Date().getFullYear()} The Halal Explorer. All rights
            reserved.
          </Typography>
        </Container>
    </>
  );
}