import { Container, Grid, Typography, Card, Link, CardMedia, CardContent } from "@mui/material"
import { Destination } from "@/types";
import _get from "lodash/get"

export default function DestinationList({ destinations }: { destinations: Destination[] }) {
  return (
    <Container maxWidth="lg" className='featured-content'>
        <Grid container spacing={4}>
        {destinations.map((place: Destination) => (
          <Grid key={place._id} size={4}>
            <Card>
                <Link href={`/destinations/${place.slug.current}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <CardMedia
                component="img"
                height="180"
                image={_get(place, 'image.asset.url', 'https://placehold.co/600x400?text=the+halal+explorer')}
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
  );
}