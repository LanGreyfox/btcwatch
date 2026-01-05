const storage = useStorage('crypto')

export const useFileStorage = () => {

    const saveFile = async (filename: string, data: any) => {
        await storage.setItem(filename, data)
    }

    const readFile = async (filename: string) => {
        if (await storage.hasItem(filename)) {
            return await storage.getItem(filename)
        }
        return null
    }
    
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

    return {
        saveFile,
        readFile,
        createFilePath
    }

}