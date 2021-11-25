import dotenv from 'dotenv';

dotenv.config();

// eslint-disable-next-line import/prefer-default-export
export const port = process.env.PORT || 5000;

