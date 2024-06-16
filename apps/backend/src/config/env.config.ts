import { registerAs } from '@nestjs/config';

const mapEnvValues = {
  number: (envValue: string, defaultValue: number) => {
    const value = Number(envValue);

    return !envValue || Number.isNaN(value) ? defaultValue : value;
  },
  array: (envValue: string, delimiter = ',') => {
    const values = envValue.split(delimiter).filter(Boolean);

    return values;
  },
};

const defaultAppPort = 3001;

const envConfig = registerAs('env', () => ({
  port: mapEnvValues.number(process.env.PORT || '', defaultAppPort),
  appName: process.env.APP_NAME || '',
  allowedOrigins: mapEnvValues.array(process.env.ALLOWED_CORS_ORIGINS || ''),
  frontendHostUrl: process.env.FRONTEND_HOST_URL || '',
  backendHostUrl: process.env.BACKEND_HOST_URL || '',
  openWether: {
    url: process.env.OPENWEATHER_API_URL || '',
    key: process.env.OPENWEATHER_API_KEY || '',
  },
  geoDb: {
    url: process.env.GEO_DB_URL || '',
    key: process.env.GEO_DB_KEY || '',
    host: process.env.GEO_DB_HOST || '',
  },
  githubApiUrl: process.env.GITHUB_API_URL || '',
}));

export default envConfig;
