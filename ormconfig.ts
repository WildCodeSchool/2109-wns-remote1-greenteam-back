import {pass_db, pseudo_db, name_db, port_db} from "./src/settings"

interface ConnOptions {
   type: string;
   database: string;
   host?: string;
   port?: number | string;
   username?: string;
   password?: string;
}

// For MySQL DB (prod)
const mysqlConfig: ConnOptions = {
   type: 'mysql',
   host: 'localhost',
   port: port_db,
   username: pseudo_db,
   password: pass_db,
   database: name_db,
};

// For SQLite3 DB (dev)
const sqliteConfig: ConnOptions = {
   type: 'sqlite',
   database: './dev.sqlite3',
};

export default {
  ...mysqlConfig,
  synchronize: true,
  logging: false,
  entities: ['src/entity/**/*.ts'],
  migrations: ['src/migration/**/*.ts'],
  subscribers: ['src/subscriber/**/*.ts'],
  cli: {
    entitiesDir: 'src/entity',
    migrationsDir: 'src/migration',
    subscribersDir: 'src/subscriber',
  },
};
