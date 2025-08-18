// server/index.js



const dns = require('dns');

// Use reliable public resolvers (bypasses ISP/router DNS)
dns.setServers(['1.1.1.1', '8.8.8.8']);

// Prefer IPv4 results first (helps when only AAAA is returned)
try { dns.setDefaultResultOrder('ipv4first'); } catch (_) {}






require('dotenv').config(); 
const express = require('express');
const cors = require('cors');
const apiRoutes =require("./Routes/apiRoutes");

const app = express();
const PORT = process.env.PORT || 5000; // Use port 5000 for the backend

// Middleware
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // Enable parsing of JSON data in the request body

app.use("/api", apiRoutes);

// A simple test route to make sure the server is running

// Start the server




console.log('DB URL ->', JSON.stringify(process.env.DATABASE_URL));
try {
  const u = new URL(process.env.DATABASE_URL);
  console.log('DB host ->', JSON.stringify(u.hostname));
} catch(e) { console.error('Bad DATABASE_URL', e); }





app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});