import { Container } from '@mui/material';
import { Outlet } from 'react-router-dom';

import { Header } from 'src/components';

const WeatherLayout = () => {
  const headerHeight = '60px';
  return (
    <>
      <Header appBarSx={{ height: headerHeight }} />
      <Container
        maxWidth={false}
        sx={{
          backgroundImage: 'url(/clouds.jpg)',
          backgroundSize: 'cover',
          display: 'flex',
          flexDirection: 'column',
          maxWidth: 'unset',
          width: '100%',
          height: `calc(100vh - ${headerHeight})`,
        }}
      >
        <Outlet />
      </Container>
    </>
  );
};

export default WeatherLayout;
