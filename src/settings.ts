import * as dotenv from 'dotenv';

dotenv.config();

// eslint-disable-next-line import/prefer-default-export
export const port = process.env.PORT || 5000;
export const port_db = process.env.PORT_DB;
export const pass_db = process.env.PASS_DB;
export const pseudo_db = process.env.PSEUDO_DB;
export const name_db = process.env.NAME_DB

