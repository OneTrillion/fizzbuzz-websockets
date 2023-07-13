export const getSessionData = (key: string): string | null => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
};

export const setSessionData = (key: string, value: string) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const generateSessionId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
};
