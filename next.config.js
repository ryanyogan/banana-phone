/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: [
      "qglqiqezlirvijoikugc.supabase.in",
      "ytmkgjmqufkbwssfnahf.supabase.in",
      "api.cloudinary.com",
    ],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};
