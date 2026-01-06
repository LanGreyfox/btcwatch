let blockTime: number = 0;

export const useBtcBlockTime = () => {

    const setBlockTime = (time: number) => {
        blockTime = time;
    }

    const getBlockTime = () => {
        return blockTime;
    }

    return {
        setBlockTime,
        getBlockTime
    }
}