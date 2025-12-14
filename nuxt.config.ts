// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-12-11',

  devtools: { enabled: true },

  modules: ['@nuxtjs/tailwindcss'],

  runtimeConfig: {
    // Private keys (only available server-side)
    dbHost: process.env.DB_HOST,
    dbPort: process.env.DB_PORT,
    dbUser: process.env.DB_USER,
    dbPassword: process.env.DB_PASSWORD,
    dbName: process.env.DB_NAME,
    sessionSecret: process.env.SESSION_SECRET,
    hashidsSalt: process.env.HASHIDS_SALT,
    bcryptSaltRounds: process.env.BCRYPT_SALT_ROUNDS,
    mailHost: process.env.MAIL_HOST,
    mailPort: process.env.MAIL_PORT,
    mailUser: process.env.MAIL_USER,
    mailPassword: process.env.MAIL_PASSWORD,
    mailFrom: process.env.MAIL_FROM,

    // Public keys (exposed to client)
    public: {
      apiBase: '/api'
    }
  },

  nitro: {
    preset: 'vercel',
    storage: {
      sessions: {
        driver: 'memory'
      }
    }
  }
});
