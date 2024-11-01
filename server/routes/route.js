// Accessing Express Packages
const express = require("express");
const router = express.Router();

// Importing env file
require("dotenv").config();

const { OAuth2Client } = require('google-auth-library');

// const client = new OAuth2Client({
//   clientId: process.env.GOOGLE_CLIENT_ID,
//   clientSecret: process.env.Google_Client_Secret,
//   redirectUri: process.env.GOOGLE_REDIRECT_URI
// });

const client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.Google_Client_Secret,
  process.env.GOOGLE_REDIRECT_URI
);

// const { tokens } = client.getToken("4/0AVG7fiT32XVv6qVpPu93CoSCv0kxv5GTq7hNFtY8VDyQNrjovDVNsfHMwDEzyDhF6EQXjA");
// console.log('Tokens:', tokens);

// Routes
router.get("/connecting", async (req, res) => {
  try {    
    res.status(200).send("connected");
  } catch (error) {
    console.error("Error: ", error.message);
    res.status(400).send(error.message);
  }
});

// Route to initiate authentication
router.get('/auth/google/url', (req, res) => {
  try {    
    const url = client.generateAuthUrl({
      access_type: 'offline',
      scope: [
        'https://www.googleapis.com/auth/calendar',
        'https://www.googleapis.com/auth/calendar.events',
      ],
    });
    res.json({ url });
  } catch (error) { 
    res.status(500).json({ error: 'Failed' });
  }
});

// Callback route after user authenticates
router.get('/auth/google/callback', async (req, res) => {
  const { code } = req.query;
  
  try {
    console.log("code:", code);
    const { tokens } = await client.getToken(code);
    // const r = await client.getToken(code);
    // console.log("token: ", r);
    
    client.setCredentials(tokens);
    const newTokens = await client.getAccessToken();
    // console.log("bye3: ", newTokens.credentials);
    req.session.tokens = newTokens.credentials;
    // Store tokens in session or database
    // ...
    
    res.json(tokens);
  } catch (error) {
    console.log(error.message);
     
    res.status(500).json({ error: 'Failed to fetch access token' });
  }
});

// Exporting router
module.exports = router;