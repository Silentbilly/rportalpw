

export class StringUtils {

    static async getRandomString(length: number) : Promise<string> {
        const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = ' ';
        const charactersLength = characters.length;
        for ( let i = 0; i < length; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    static async getRandomName(lettersNumber: number) : Promise<string> {
        return '[AQA] ' + await StringUtils.getRandomString(lettersNumber);
    }
}