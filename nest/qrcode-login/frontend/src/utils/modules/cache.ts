enum CacheType {
  Local,
  Session
}

class Cache {
  private storage: Storage;

  constructor(type:CacheType) {
    this.storage = type === CacheType.Local ? localStorage : sessionStorage;
  }

  setCache(key: string, value: any) {
    if (value) {
      this.storage.setItem(key, JSON.stringify(value));
    }
  }
  getCache(key: string) {
    const value = this.storage.getItem(key);
    if (value) {
      return JSON.parse(value);
    }
  }

  clear() {
    this.storage.clear();
  }
}

const localCache = new Cache(CacheType.Local);
const sessionCache = new Cache(CacheType.Session);

export  {
  localCache,
  sessionCache
};
