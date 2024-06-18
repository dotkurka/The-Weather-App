import { SxProps } from '@mui/material';

import { CitiesResponse } from 'src/types';

export interface CitySearchProps {
  onChange: (value: CitiesResponse) => void;
  sx?: SxProps;
}
