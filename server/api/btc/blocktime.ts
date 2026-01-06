import { useBtcBlockTime } from '../../../app/composables/useBtcBlockTime';

export default defineEventHandler(async (event) => {
    return {
        result: useBtcBlockTime().getBlockTime(),
    }
})