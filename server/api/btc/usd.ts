import { useFileStorage } from "../../../app/composables/useFileStorage";

export default defineEventHandler(async (event) => {
    const { readFile, createFilePath } = useFileStorage();

    // Generate the filename based on the current date and time
    const filename = createFilePath();
    const data: any = await readFile(filename);

    if (!data) {
        return {
            result: 0,
            message: 'No BTC price data found for the current hour.'
        }
    }

    const price = (() => {
        if (!data) return null
        if (data.data?.BTC && Array.isArray(data.data.BTC)) {
            return data.data.BTC[0]?.quote?.USD?.price ?? null
        }
        if (data.data && typeof data.data === 'object') {
            const first: any = Object.values(data.data)[0]
            if (first?.quote?.USD?.price) return first.quote.USD.price
        }
        if (data.quote?.USD?.price) return data.quote.USD.price
        return null
    })()

    if (price == null) {
        return {
            result: 0
        }
    }

    return {
        result: price,
    }
})