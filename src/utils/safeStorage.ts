/**
 * Safe Storage utility that gracefully handles private/incognito browsing,
 * restricted iframe environments, and disabled cookie/storage policies
 * without throwing SecurityError / DOMException.
 */

const memoryStorage = new Map<string, string>();
const sessionMemoryStorage = new Map<string, string>();

export const safeLocalStorage = {
  getItem: (key: string): string | null => {
    try {
      if (typeof window !== "undefined" && window.localStorage) {
        return window.localStorage.getItem(key);
      }
    } catch {
      // InPrivate or storage denied fallback
    }
    return memoryStorage.get(key) || null;
  },

  setItem: (key: string, value: string): void => {
    try {
      if (typeof window !== "undefined" && window.localStorage) {
        window.localStorage.setItem(key, value);
      }
    } catch {
      // InPrivate or storage denied fallback
    }
    memoryStorage.set(key, value);
  },

  removeItem: (key: string): void => {
    try {
      if (typeof window !== "undefined" && window.localStorage) {
        window.localStorage.removeItem(key);
      }
    } catch {
      // InPrivate or storage denied fallback
    }
    memoryStorage.delete(key);
  }
};

export const safeSessionStorage = {
  getItem: (key: string): string | null => {
    try {
      if (typeof window !== "undefined" && window.sessionStorage) {
        return window.sessionStorage.getItem(key);
      }
    } catch {
      // InPrivate or storage denied fallback
    }
    return sessionMemoryStorage.get(key) || null;
  },

  setItem: (key: string, value: string): void => {
    try {
      if (typeof window !== "undefined" && window.sessionStorage) {
        window.sessionStorage.setItem(key, value);
      }
    } catch {
      // InPrivate or storage denied fallback
    }
    sessionMemoryStorage.set(key, value);
  },

  removeItem: (key: string): void => {
    try {
      if (typeof window !== "undefined" && window.sessionStorage) {
        window.sessionStorage.removeItem(key);
      }
    } catch {
      // InPrivate or storage denied fallback
    }
    sessionMemoryStorage.delete(key);
  }
};
