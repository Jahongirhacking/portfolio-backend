export const localStorageNames = {
  token: "token",
};

export const getExistedOne = (...args: string[] | number[] | object[]) => {
  const existed = args.find((val) => val);
  return existed;
};

export const setLocalStorage = (
  key: string,
  value: object | number | string | boolean
) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getLocalStorage = (key: string) => {
  const item = localStorage.getItem(key);
  try {
    return item ? JSON.parse(item) : null;
  } catch (e) {
    console.error(e);
    return item;
  }
};
