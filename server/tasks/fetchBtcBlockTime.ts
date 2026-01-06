import { useBtcBlockTime } from '../../app/composables/useBtcBlockTime';

export default defineTask({
  meta: {
    name: 'fetchBtcBlockTime',
    description: 'Fetches the current Bitcoin block time from an external API',
  },
  async run({ payload, context }) {
    let data = null
    console.log('Fetch BTC Block Time ...');

    // Define the API endpoint
    const apiUrl = 'https://mempool.space/api/blocks/tip/height';

    try {
        // Use $fetch for making the API call
        data = await $fetch(apiUrl, {
            method: 'GET'
        })
        console.log('Received data: ', data)

        if(typeof data === 'number') {
            useBtcBlockTime().setBlockTime(data);
        }
        if(typeof data === 'string') {
            const parsed = parseInt(data, 10);
            if(!isNaN(parsed)) {
                useBtcBlockTime().setBlockTime(parsed);
            }
        }
    } catch (error) {
        console.error('Error on API-call fetch block time:', JSON.stringify(error))
        return { result: 'error' }
    }

    return { result: 'success' }
  }
})