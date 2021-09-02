export default class LocalStorageService {
    static saveToLocalStorage(key: string, data: object | null): object | null {
        try {
            localStorage.setItem(key, JSON.stringify(data));
            return data;
        } catch (e) {
            console.warn('Could not save to local storage', e);
            return null;
        }
    }

    static loadFromLocalStorage(key: string): object | null {
        try {
            const serialized = localStorage.getItem(key);
            if (serialized === null) {
                return null;
            } 
            return JSON.parse(serialized);
        } catch (e) {
            console.warn('Error loading form storage', e);
            return null;
        }
    }

    static deleteFromLocalStorage(key: string): void {
        localStorage.removeItem(key);
    }
}