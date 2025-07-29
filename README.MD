# ClientStorage - 浏览器存储二次封装库

`ClientStorage` 是一个轻量级的 JavaScript 库，用于对浏览器本地存储（`localStorage`）和会话存储（`sessionStorage`）进行二次封装，提供更便捷的数据存取方式，并支持**自动过期时间**管理。

## 功能特性

✅ **支持 `localStorage` 和 `sessionStorage`**  
✅ **自动 JSON 序列化/反序列化**  
✅ **支持数据过期时间（TTL）**  
✅ **类型安全（TypeScript 支持）**  
✅ **简洁易用的 API**

## 安装

```bash
npm install boswer-storage
# 或
yarn add boswer-storage
```

## 使用方法

### 1. 初始化

```ts
import { ClientStorage } from 'boswer-storage';

// 使用 localStorage
const ls = new ClientStorage('local');

// 使用 sessionStorage
const ss = new ClientStorage('session');
```

### 2. 存储数据

```ts
// 存储数据（默认永不过期）
ls.set('username', 'Alice');

// 存储数据，10秒后过期
ls.set('token', 'abc123', 10000); // 单位：毫秒
```

### 3. 获取数据

```ts
// 获取数据（自动解析 JSON）
const username = ls.get<string>('username'); // 'Alice'

// 如果数据过期，返回 undefined
const expiredToken = ls.get<string>('token'); // undefined
```

### 4. 检查数据是否存在

```ts
const hasUser = ls.has('username'); // true
```

### 5. 删除数据

```ts
ls.remove('username');
```

### 6. 清空存储

```ts
ls.clear(); // 清空所有数据
```

## API 文档

### `new ClientStorage(type: 'local' | 'session')`

- `type`：指定存储类型，可选 `'local'`（`localStorage`）或 `'session'`（`sessionStorage`）。

### `get<T>(key: string): T | undefined`

- 获取存储的数据，自动解析 JSON 并检查过期时间。
- 如果数据不存在或已过期，返回 `undefined`。

### `set<T>(key: string, value: T, maxAge: number = -1): void`

- 存储数据，自动进行 JSON 序列化。
- `maxAge`：数据有效期（毫秒），默认 `-1`（永不过期）。

### `has(key: string): boolean`

- 检查指定 `key` 是否存在。

### `remove(key: string): void`

- 删除指定 `key` 的数据。

### `clear(): void`

- 清空所有存储数据。

## 注意事项

⚠ **数据格式**：

- 存储的数据会被自动转换为 JSON 字符串，并包含 `data` 和 `expire` 字段。
- 如果手动修改了存储的数据结构，可能导致解析失败。

⚠ **浏览器兼容性**：

- 依赖 `localStorage` 和 `sessionStorage`，不支持 IE 8 及以下版本。

## 示例

```ts
const storage = new ClientStorage('local');

// 存储用户信息，30分钟后过期
storage.set('user', { id: 1, name: 'Bob' }, 30 * 60 * 1000);

// 获取用户信息
const user = storage.get<{ id: number; name: string }>('user');
console.log(user); // { id: 1, name: 'Bob' }（未过期时）
```

## License

MIT
