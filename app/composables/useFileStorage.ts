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

    return {
        saveFile,
        readFile
    }

}