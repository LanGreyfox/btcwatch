export default defineTask({
  meta: {
    name: 'fetchBtcPriceData',
    description: 'Fetches the current Bitcoin price in USD from an external API',
  },
  async run({ payload, context }) {
    console.log('Fetch BTC Price ...')
    // Define the API endpoint
    return { result: 'success' }
  }
})