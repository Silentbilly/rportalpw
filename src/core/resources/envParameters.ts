import dotenv from 'dotenv'; 
dotenv.config();

export const RP_USERNAME = process.env.RP_USERNAME as string;
export const RP_PASSWORD = process.env.RP_PASSWORD as string;
export const BASIC_AUTH_TOKEN = process.env.BASIC_AUTH_TOKEN as string;
export const RP_API_KEY = process.env.RP_API_KEY as string;