/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    SERVIDOR: process.env.SERVIDOR,
    HOST: process.env.HOST,
    PORTEMAIL: process.env.PORTEMAIL,
    USER: process.env.USER,
    PASSWORD: process.env.PASSWORD,
    TO: process.env.TO
  }
}

module.exports = nextConfig