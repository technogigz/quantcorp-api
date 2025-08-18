// // server/db.js
// const { Pool } = require('pg');
// require('dotenv').config(); // This loads the .env file variables

// // Create a new pool instance using the connection string from your .env file
// const pool = new Pool({
//   connectionString: process.env.DATABASE_URL,
//    ssl: { require: true, rejectUnauthorized: false },
// });

// // Export the pool so other files can use it to query the database
// module.exports = pool;






// server/db.js
// const fs = require('fs');
// const path = require('path');
// const { Pool } = require('pg');
// require('dotenv').config();

// const caPath = path.join(__dirname, 'certs', 'supabase-ca.pem');

// const pool = new Pool({
//   connectionString: process.env.DATABASE_URL,
//   ssl: {
//     require: true,
//     ca: fs.readFileSync(caPath, 'utf8'),
//   },
// });

// module.exports = pool;





// const fs = require('fs');
// const path = require('path');
// const { Pool } = require('pg');
// require('dotenv').config();

// const caPath = path.join(__dirname, 'certs', 'supabase-ca.pem'); // downloaded from Supabase
// let ssl = { require: true };
// try { ssl.ca = fs.readFileSync(caPath, 'utf8'); }
// catch { ssl.rejectUnauthorized = false; console.warn('Using dev SSL fallback (no CA)'); }

// const pool = new Pool({
//   connectionString: process.env.DATABASE_URL,
//   ssl,
//   // Force IPv4 lookups for pg as well
//   lookup(hostname, opts, cb) {
//     return require('dns').lookup(hostname, { family: 4, all: false }, cb);
//   },
// });

// module.exports = pool;




// server/db.js
require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  // Dev-safe TLS; switch to CA file for prod if you want strict verify.
  ssl: { require: true, rejectUnauthorized: false },
  max: 10,               // sensible pool size
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 10000,
});

pool.on('error', (e) => console.error('PG pool error:', e));
module.exports = pool;


