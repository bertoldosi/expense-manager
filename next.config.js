require("dotenv").config();

module.exports = {
  compiler: {
    styledComponents: true,
  },
  publicRuntimeConfig: {
    BASE_URL: process.env.BASE_URL || "http://localhost:3000",

    CLIENT_ID: process.env.CLIENT_ID,
    GOOGLE_SECRET: process.env.GOOGLE_SECRET,

    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
  },
};
