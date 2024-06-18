import { Navigate, Route, Routes as RouterRoutes } from 'react-router-dom';

import WeatherLayout from 'src/layouts/WeatherLayout/WeatherLayout';
import { Weather } from 'src/pages';

const Routes = () => {
  return (
    <RouterRoutes>
      <Route element={<WeatherLayout />} path={'/'}>
        <Route element={<Weather />} index />
      </Route>
      <Route path='*' element={<Navigate to='/' replace />} />
    </RouterRoutes>
  );
};

export default Routes;
