import { createConnection, Connection } from 'typeorm';

export default async function initConnectDb(): Promise<Connection | void> {
  try {
    const init = await createConnection();
    console.log('connecté à la db');
    return init;
  } catch (e) {
    console.log(e);
    return null;
  }
}
