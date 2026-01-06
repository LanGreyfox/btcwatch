// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  nitro: {
    experimental: {
      tasks: true
    },
    scheduledTasks: {
      // Läuft jede Minute
      '0 * * * *': ['fetchBtcPriceData'],
      '*/5 * * * *': ['fetchBtcBlockTime']
    },
    storage: {
      'crypto': {
        driver: 'fs',
        base: './data'
      }
    }
  }
})
