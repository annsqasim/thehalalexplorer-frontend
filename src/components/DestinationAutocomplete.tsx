// components/DestinationAutocomplete.tsx
'use client';

import { Autocomplete, TextField } from '@mui/material';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import _get from 'lodash/get';
import { Destination } from "@/types"

export default function DestinationAutocomplete({ destinations }: { destinations: Destination[] }) {
  const [options, setOptions] = useState(destinations);
  const [inputValue, setInputValue] = useState('');
  const router = useRouter();

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
          router.push(`/destinations/${_get(selectedOption, 'slug.current', selectedOption.id)}`);
        }
      }}
      sx={{ width: '100%' }}
    />
  );
}
