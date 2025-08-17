export class LocalStorageService {
  static get(key) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  }

  static set(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
  }

  static removeItem(key) {
    localStorage.removeItem(key);
  }
}
