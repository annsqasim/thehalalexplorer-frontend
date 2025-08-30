// components/DestinationAutocomplete.tsx
'use client';

import { Autocomplete, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { client } from '@/lib/sanity';
import { getDestinationsQuery } from '@/lib/queries';
import { useRouter } from 'next/navigation';
import _get from 'lodash/get';

type Destination = {
  _id: string;
  name: string;
  country: string;
  slug: string;
};

export default function DestinationAutocomplete({ destinations }: { destinations: Destination[] }) {
  const [options, setOptions] = useState(destinations);
  const [inputValue, setInputValue] = useState('');
  const router = useRouter();

//   useEffect(() => {
//     const fetchData = async () => {
//       const data: Destination[] = await client.fetch(getDestinationsQuery);
//       setOptions(data);
//     };
//     fetchData();
//   }, []);

  return (
    <Autocomplete
      options={options}
      getOptionLabel={(option) => `${option.name}, ${option.country}`}
      renderInput={(params) => <TextField {...params} label="Search Destinations" />}
      inputValue={inputValue}
      onInputChange={(_, newValue) => setInputValue(newValue)}
      onChange={(_, selectedOption) => {
        console.log('Selected option:', selectedOption);
        if (selectedOption) {
          router.push(`/destinations/${_get(selectedOption, 'slug.current', selectedOption._id)}`);
        }
      }}
      sx={{ width: '100%' }}
    />
  );
}
