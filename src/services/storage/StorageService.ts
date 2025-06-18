
export class StorageService {
  private static readonly KEYS = {
    USER_CONFIG: 'userConfiguration',
    SYSTEM_CONFIG: 'system_config',
    CONVERSATIONS: 'conversations',
    MESSAGES_PREFIX: 'messages-',
  } as const;

  static get<T>(key: string, defaultValue?: T): T | null {
    try {
      const item = localStorage.getItem(key);
      if (item === null) return defaultValue || null;
      return JSON.parse(item);
    } catch (error) {
      console.error(`Error parsing localStorage item "${key}":`, error);
      return defaultValue || null;
    }
  }

  static set<T>(key: string, value: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error saving to localStorage "${key}":`, error);
    }
  }

  static remove(key: string): void {
    localStorage.removeItem(key);
  }

  static clear(): void {
    localStorage.clear();
  }

  // Métodos específicos para datos de la aplicación
  static getUserConfig<T>(defaultValue?: T): T | null {
    return this.get(this.KEYS.USER_CONFIG, defaultValue);
  }

  static setUserConfig<T>(config: T): void {
    this.set(this.KEYS.USER_CONFIG, config);
  }

  static getSystemConfig<T>(defaultValue?: T): T | null {
    return this.get(this.KEYS.SYSTEM_CONFIG, defaultValue);
  }

  static setSystemConfig<T>(config: T): void {
    this.set(this.KEYS.SYSTEM_CONFIG, config);
  }

  static getConversations<T>(defaultValue?: T): T | null {
    return this.get(this.KEYS.CONVERSATIONS, defaultValue);
  }

  static setConversations<T>(conversations: T): void {
    this.set(this.KEYS.CONVERSATIONS, conversations);
  }

  static getMessages<T>(conversationId: string, defaultValue?: T): T | null {
    return this.get(`${this.KEYS.MESSAGES_PREFIX}${conversationId}`, defaultValue);
  }

  static setMessages<T>(conversationId: string, messages: T): void {
    this.set(`${this.KEYS.MESSAGES_PREFIX}${conversationId}`, messages);
  }
}
