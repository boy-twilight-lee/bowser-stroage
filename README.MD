# browser-storage

`browser-storage` 是一个用于浏览器 `localStorage` 和 `sessionStorage` 的高级封装库。它在原生 `Storage` API 的基础上，提供了类型支持、数据过期功能以及更便捷的 JSON 数据处理。

## 特性

- **类型安全**: 使用 TypeScript 泛型来支持任意类型的数据存储与检索。
- **自动 JSON 化**: 自动将存入的数据序列化为 JSON 字符串，并在取出时解析还原。
- **数据有效期**: 可以为每个存储项设置一个有效期（maxAge），过期后数据将被自动清除。
- **统一的 API**: 为 `localStorage` 和 `sessionStorage` 提供了完全一致的操作方法。
- **错误处理**: 内置了 JSON 解析的错误处理，避免因存储了非标准 JSON 格式字符串而导致的程序崩溃。

## 快速上手

### 安装

```bash
npm install browser-storage
```

### 引入和使用

```typescript
import { BrowserStorage } from 'browser-storage';

// 实例化，'local' 代表 localStorage，'session' 代表 sessionStorage
const myLocalStorage = new BrowserStorage('local');
const mySessionStorage = new BrowserStorage('session');

// 1. 存储数据
myLocalStorage.set('user', { name: 'Alice', id: 1 });
myLocalStorage.set('token', 'some-secret-token', 3600 * 1000); // 设置1小时后过期

// 2. 获取数据
const user = myLocalStorage.get<{ name: string; id: number }>('user');
console.log(user); // 输出: { name: 'Alice', id: 1 }

const token = myLocalStorage.get<string>('token');
console.log(token); // 输出: 'some-secret-token' (如果未过期)

// 1小时后再次获取 token
// const expiredToken = myLocalStorage.get<string>('token');
// console.log(expiredToken); // 输出: undefined，并且该键值对已被从 localStorage 中移除

// 3. 检查是否存在
console.log(myLocalStorage.has('user')); // 输出: true
console.log(myLocalStorage.has('non-existent-key')); // 输出: false

// 4. 移除数据
myLocalStorage.remove('user');
console.log(myLocalStorage.has('user')); // 输出: false

// 5. 清空所有数据
myLocalStorage.clear();
console.log(myLocalStorage.length()); // 输出: 0
```

## API 详解

### 构造函数

| 方法                       | 描述                             | 参数                                                           |
| :------------------------- | :------------------------------- | :------------------------------------------------------------- |
| `new BrowserStorage(type)` | 创建一个 `BrowserStorage` 实例。 | `type: 'local' \| 'session'` <br> 指定要使用的浏览器存储类型。 |

### 实例方法

| 方法                              | 描述                                                                          | 参数                                                                                                                                                      | 返回值                                                   |
| :-------------------------------- | :---------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------- |
| **`get<T>(key)`**                 | 获取指定 `key` 对应的值。如果数据已过期，会自动移除该数据并返回 `undefined`。 | `key: string` <br> 要获取的数据的键名。                                                                                                                   | `T \| undefined` <br> 返回解析后的数据或 `undefined`。   |
| **`set<T>(key, value, maxAge?)`** | 存储一个键值对，并可以设置其有效期。                                          | `key: string` <br> 要设置的键名。<br><br> `value: T` <br> 要存储的值。<br><br> `maxAge?: number` <br> (可选) 有效期，单位为毫秒。默认为 `-1` (永不过期)。 | `void`                                                   |
| **`has(key)`**                    | 检查指定的 `key` 是否存在于存储中。                                           | `key: string` <br> 要检查的键名。                                                                                                                         | `boolean` <br> 如果存在则返回 `true`，否则返回 `false`。 |
| **`remove(key)`**                 | 从存储中移除指定的键值对。                                                    | `key: string` <br> 要移除的键名。                                                                                                                         | `void`                                                   |
| **`clear()`**                     | 清空当前存储类型下的所有键值对。                                              | (无)                                                                                                                                                      | `void`                                                   |
| **`length()`**                    | 获取当前存储中的键值对数量。                                                  | (无)                                                                                                                                                      | `number` <br> 键值对的数量。                             |
| **`key(index)`**                  | 根据索引获取键名（原生方法）。                                                | `index: number` <br> 要获取的键名的索引。                                                                                                                 | `string \| null` <br> 对应的键名或 `null`。              |
