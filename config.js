require('dotenv').config();

module.exports = {
   MONGO_URI: process.env.ATLAS_URI,
   JWT_SECRET: process.env.JWT_SECRET,
   GITHUB_CLIENT_ID: process.env.GITHUB_CLIENTID,
   GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENTSECRET,
   PORT: process.env.PORT
}