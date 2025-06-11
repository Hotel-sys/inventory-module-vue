

export enum StorageKey {
    TOKEN = "access_token"
}

export default class StorageManager {
    static save(key: StorageKey, data: any){
        try {
            localStorage.setItem(key, data);
            return true;
        } catch (err) {
            console.error(err);

            return false;
        }
    }

    static retrieve(key: StorageKey) {
        const data = localStorage.getItem(key);

        if (data) {
            return JSON.parse(data);
        }

        return '';
    }

    static accessTokenExists(): boolean {
        const rawToken = localStorage.getItem(StorageKey.TOKEN);

        if (rawToken) {
            return true;
        }

        return false;
    }
}







