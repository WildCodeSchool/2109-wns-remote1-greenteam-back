interface ConnOptions {
   type: string;
   database: string;
   host?: string;
   port?: number;
   username?: string;
   password?: string;
}

// For MySQL DB (prod)
const mysqlConfig: ConnOptions = {
   type: 'mysql',
   host: 'localhost',
   port: 3307,
   username: 'valere_collabee',
   password: 'collabee',
   database: 'collabee',
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
