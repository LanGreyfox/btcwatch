export default defineTask({
  meta: {
    name: 'fetchBtcPriceData',
    description: 'Fetches the current Bitcoin price in USD from an external API',
  },
  async run({ payload, context }) {
    console.log('Fetch BTC Price ...');

    if(!process.env.COINMARKETCAP_API_KEY) {
      console.log('No CoinMarketCap API Key found in environment variables. Skip fetching BTC price.');
      return { result: 'error' }
    }

    // Define the API endpoint
    const apiKey = process.env.COINMARKETCAP_API_KEY;
    const apiUrl = 'https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest';
    const params = {
      symbol: 'BTC',
      convert: 'USD'
    };
    const headers = {
      'X-CMC_PRO_API_KEY': apiKey,
      'Accept': 'application/json'
    } as HeadersInit;

    try {
      // Nutze $fetch für den API-Aufruf
      const data = await $fetch(apiUrl, {
        method: 'GET',
        headers: headers,
        params: params
      })

      console.log('Received data:', data)      
    } catch (error) {
      console.error('Error on API-call:', JSON.stringify(error))
      return { result: 'error' }
    }

    return { result: 'success' }
  }
})