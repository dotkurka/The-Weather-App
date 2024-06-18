import { Circle, Cloud, Thunderstorm, WbSunny } from '@mui/icons-material';
import { Box } from '@mui/material';
import { ReactNode } from 'react';

const weatherMap: Record<string, ReactNode> = {
  clouds: <Cloud />,
  clear: <Circle />,
  thunderstorm: <Thunderstorm />,
  drizzle: <Cloud />,
};

const TempWeather = () => {
  return (
    <Box>
      <WbSunny />
    </Box>
  );
};

export default TempWeather;
