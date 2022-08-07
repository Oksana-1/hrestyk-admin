export const cloneObject = (object) => {
  return JSON.parse(JSON.stringify(object));
};
export const getLocalStorageItem = (name) => {
  return window.localStorage.getItem(name);
};
export const setLocalStorageItem = (name, value) => {
  window.localStorage.setItem(name, value);
};
export const removeLocalStorageItem = (name) => {
  window.localStorage.removeItem(name);
};
