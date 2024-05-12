import { REDIS_HOST, REDIS_PORT } from './shared';

export default () => ({
  redis: {
    host: REDIS_HOST,
    port: REDIS_PORT,
  },
});
