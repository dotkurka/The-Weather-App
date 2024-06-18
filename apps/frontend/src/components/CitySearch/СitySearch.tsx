import { Autocomplete, TextField, styled } from '@mui/material';
import { HTMLProps, useState } from 'react';

import { CitySearchProps } from 'src/components/CitySearch/types';
import { useSearchCities } from 'src/hooks/useSearchCities';
import { CitiesResponse } from 'src/types';

const InheritButton = styled('button')({
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  height: '100%',
  border: 'none',
  background: 'none',
  cursor: 'pointer',
});

const CountryFlagIcon = styled('img')({
  marginRight: '1rem',
  width: '1.5rem',
});

const CitySearch = ({ onChange, sx }: CitySearchProps) => {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const [citiesData, { isLoading }] = useSearchCities(inputValue);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const renderOption = ({ key, ...props }: HTMLProps<HTMLLIElement>, option: CitiesResponse) => {
    // Extract 'key' from props to avoid spreading it into the DOM
    // This prevents React from issuing a warning about spreading 'key' in JSX
    return (
      <li key={option.id} {...props}>
        <InheritButton onClick={() => onChange(option)} type='button'>
          <CountryFlagIcon
            loading='lazy'
            srcSet={`https://flagcdn.com/w40/${option.countryCode.toLowerCase()}.png 2x`}
            src={`https://flagcdn.com/w20/${option.countryCode.toLowerCase()}.png`}
            alt='flag'
          />
          {option.name}, {option.region} ({option.countryCode})
        </InheritButton>
      </li>
    );
  };

  return (
    <Autocomplete
      sx={sx}
      noOptionsText='No result'
      options={citiesData ?? []}
      autoHighlight
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      isOptionEqualToValue={(option, value) => option.name === value.name}
      getOptionLabel={(option) => option.name}
      clearOnBlur={false}
      loading={isLoading}
      renderOption={renderOption}
      renderInput={(params) => (
        <TextField
          onChange={(value) => setInputValue(value.target.value)}
          {...params}
          fullWidth={true}
          placeholder='Search city'
          inputProps={{
            ...params.inputProps,
            autoComplete: 'new-password', // disable autocomplete and autofill
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: '50px',
              mb: 3,
            },
            '& .MuiAutocomplete-inputRoot': {
              pl: 4,
            },
          }}
        />
      )}
    />
  );
};

export default CitySearch;
