import dotenv from 'dotenv'; 
dotenv.config();

export const RP_USERNAME = process.env.RP_USERNAME as string;
export const RP_PASSWORD = process.env.RP_PASSWORD as string;