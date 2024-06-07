

export class StringUtils {

    static getRandomString(length: number) : string {
        const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = ' ';
        const charactersLength = characters.length;
        for ( let i = 0; i < length; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    static getRandomName(lettersNumber: number) : string {
        return '[AQA] ' + StringUtils.getRandomString(lettersNumber);
    }
}