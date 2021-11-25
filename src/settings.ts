import dotenv from 'dotenv';

dotenv.config();

// eslint-disable-next-line import/prefer-default-export
export const port = process.env.PORT || 5000;
export const db_user = process.env.PSEUDO_DB;
export const db_password = process.env.PASS_DB
