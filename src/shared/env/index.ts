import 'dotenv/config';

export const JWT_SECRET = process.env.JWT_SECRET as string;
export const JWT_EXPIRE_IN_SECONDS = Number(process.env.JWT_EXPIRE_IN_SECONDS);

export const REDIS_HOST = process.env.REDIS_HOST as string;
export const REDIS_PORT = Number(process.env.REDIS_PORT);

export const DATABASE_URL = process.env.DATABASE_URL as string;

export const POSTGRES_USER = process.env.POSTGRES_USER as string;
export const POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD as string;
export const POSTGRES_DB = process.env.POSTGRES_DB as string;
export const POSTGRES_PORT = Number(process.env.POSTGRES_PORT);
export const POSTGRES_HOST = process.env.POSTGRES_HOST as string;

export const PORT = Number(process.env.PORT);
