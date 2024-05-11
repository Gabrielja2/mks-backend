import 'dotenv/config';

export const JWT_SECRET = process.env.JWT_SECRET as string;
export const JWT_EXPIRE_IN_SECONDS = Number(process.env.JWT_EXPIRE_IN_SECONDS);

export const REDIS_HOST = process.env.REDIS_HOST as string;
export const REDIS_PORT = Number(process.env.REDIS_PORT);
