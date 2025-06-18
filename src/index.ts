import { isUndefined, isObject } from './utils/is';
import { getTimestap } from './utils/fn';

export class ClientStorage {
  private storage: Storage;

  constructor(type: 'local' | 'session') {
    this.storage = type === 'local' ? localStorage : sessionStorage;
  }

  // 获取值
  get<T>(key: string) {
    if (!this.has(key)) {
      return undefined as T;
    }
    let value: any = this.storage.getItem(key);
    // 解析value
    try {
      value = JSON.parse(value);
      // 解析数据
      const { data, expire } = value;
      // 判断格式
      if (isObject(value) && (data || expire)) {
        // 获取当前的时间
        const curTime = getTimestap();
        // 是否过期
        const isExpired = expire != -1 && curTime >= expire;
        // 删除过期的key
        value = isExpired ? this.remove(key) : data;
      }
    } catch {}
    return value as T;
  }

  // 存储值
  set<T>(key: string, value: T, maxAge: number = -1) {
    // 存储值
    this.storage.setItem(
      key,
      JSON.stringify({
        // 判断是否需要加密
        data: value,
        expire: maxAge != -1 ? getTimestap() + maxAge : maxAge,
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
}
