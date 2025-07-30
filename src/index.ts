import { isUndefined } from './utils/is';

const DATA_FLAG = 'bowser-storage';

export class BowserStorage {
  private storage: Storage;

  constructor(type: 'local' | 'session') {
    this.storage = type === 'local' ? localStorage : sessionStorage;
  }
  // 获取值
  get<T>(key: string): T | undefined {
    if (!this.has(key)) {
      return;
    }
    const json = this.storage.getItem(key)!;
    try {
      const value = JSON.parse(json);
      // 解析数据
      const { data, expire, flag } = value;
      // 如果不是
      if (flag != DATA_FLAG) {
        return value;
      }
      // 是否过期
      const isExpired = expire >= 0 && new Date().getTime() >= expire;
      // 删除过期的key
      if (isExpired) {
        this.remove(key);
        return;
      }
      return data;
    } catch {
      return json as unknown as T;
    }
  }
  // 存储值
  set<T>(key: string, value: T, maxAge: number = -1) {
    this.storage.setItem(
      key,
      JSON.stringify({
        data: value,
        expire: (maxAge >= 0 ? new Date().getTime() : 0) + maxAge,
        flag: DATA_FLAG,
      }),
    );
  }
  // 判断值是否存在
  has(key: string) {
    return !isUndefined(this.storage.getItem(key));
  }
  // 删除值
  remove(key: string) {
    if (this.has(key)) {
      this.storage.removeItem(key);
    }
  }
  // 清空储存
  clear() {
    this.storage.clear();
  }
  // length
  length() {
    return this.storage.length;
  }
  // key
  key(index: number) {
    return this.storage.key(index);
  }
}
