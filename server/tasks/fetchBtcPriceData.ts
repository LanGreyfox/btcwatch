import { useFileStorage } from '../../app/composables/useFileStorage';

const createFilePath = () => {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0');
  const day = String(currentDate.getDate()).padStart(2, '0');
  const hour = String(currentDate.getHours()).padStart(2, '0');

  const asset = 'BTC';
  const currency = 'USD';
  
  const storageKey = `${asset}:${currency}:${year}:${month}:${day}:${hour}.json`;
  return storageKey;
}

export default defineTask({
  meta: {
    name: 'fetchBtcPriceData',
    description: 'Fetches the current Bitcoin price in USD from an external API',
  },
  async run({ payload, context }) {
    let data = null
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
      // Use $fetch for making the API call
      data = await $fetch(apiUrl, {
        method: 'GET',
        headers: headers,
        params: params
      })

      console.log('Received data:', data)  
    } catch (error) {
      console.error('Error on API-call:', JSON.stringify(error))
      return { result: 'error' }
    }
  
    if(!data) {
      console.log('No data received from API.');
      return { result: 'error' }
    } else {
      try {
        // Save the fetched data to file storage
        const { saveFile } = useFileStorage();
        const filename = createFilePath();
        await saveFile(filename, data);
        console.log(`Saved BTC price data to file: ${filename}`);
      } catch (error) {
        console.error('Error saving file:', JSON.stringify(error))
        return { result: 'error' }
      } 
    }

    return { result: 'success' }
  }
})