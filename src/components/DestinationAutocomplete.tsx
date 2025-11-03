// components/DestinationAutocomplete.tsx
'use client';

import { Autocomplete, TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useMemo, useState } from 'react';
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
      autoHighlight
      clearOnEscape
      includeInputInList
      groupBy={(option) => option.country}
      getOptionLabel={(option) => `${option.name}, ${option.country}`}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Search destinations, e.g. Dubai"
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon fontSize="small" />
              </InputAdornment>
            ),
          }}
        />
      )}
      inputValue={inputValue}
      onInputChange={(_, newValue) => setInputValue(newValue)}
      onChange={(_, selectedOption) => {
        console.log('Selected option:', selectedOption);
        if (selectedOption) {
          router.push(`/destinations/${_get(selectedOption, 'slug.current', selectedOption.id)}`);
        }
      }}
      onKeyDown={(e) => {
        if (e.key === 'Enter' && inputValue) {
          const match = options.find(o => `${o.name}, ${o.country}`.toLowerCase().includes(inputValue.toLowerCase()))
          if (match) {
            e.preventDefault()
            router.push(`/destinations/${_get(match, 'slug.current', match.id)}`)
          }
        }
      }}
      sx={{ width: '100%' }}
    />
  );
}
