export const saveLayout = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const loadLayout = (key) => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
};
