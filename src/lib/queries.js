// lib/queries.js
export const getDestinationsQuery = `
*[_type == "destination"]{
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
  }
`;
