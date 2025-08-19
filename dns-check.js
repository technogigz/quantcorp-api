require('dotenv').config();
const { promises: dns } = require('dns');

(async () => {
  const host = new URL(process.env.DATABASE_URL).hostname;
  //console.log('HOST =', host);
  try {
    const a = await dns.lookup(host);
   // console.log('DNS OK ->', a.address);
  } catch (e) {
    console.error('DNS FAIL ->', e.code, e.message);
  }
})();
