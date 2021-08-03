export default class LocalStorageService {
    static saveToLocalStorage(key: string, data: object | null, expiration: number = 60): object | null {
        try {
            const expirationMs = expiration * 60 * 1000;
            const record = {
                value: JSON.stringify(data),
                timestamp: new Date().getTime() + expirationMs,
            };

            const serialized = JSON.stringify(record);
            localStorage.setItem(key, serialized);
            return data;
        } catch (e) {
            console.warn('Could not save to local storage', e);
            return null;
        }
    }

    static loadFromLocalStorage(key: string): object | void {
        try {
            const serialized = localStorage.getItem(key);
            if (serialized === null) {
                return undefined;
            } else {
                const record = JSON.parse(serialized);
                let date = (new Date()).getTime() < record.timestamp && JSON.parse(record.value);
                if (date === {} || date === undefined || date === false) {
                    localStorage.removeItem(key);
                    date = undefined;
                }
                return date;
            }
        } catch (e) {
            console.warn('Error loading form storage', e);
            return undefined;
        }
    }
}