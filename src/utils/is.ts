export const isString = (data: any) => {
  return typeof data === 'string';
};

export const isUndefined = (data: any) => {
  return typeof data == 'undefined';
};

export const isNull = (data: any) => {
  return data === null;
};

export function isObject(value: any): value is object {
  return !!value && typeof value === 'object';
}
