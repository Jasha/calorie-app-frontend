const ITEM_KEY = 'user';

interface IUser {
  token: string;
  is_superuser: boolean;
}

export const setUser = (user: IUser) => {
  localStorage.setItem(ITEM_KEY, JSON.stringify(user));
};

export const removeUser = () => {
  localStorage.removeItem(ITEM_KEY);
};

export const getUser = (): IUser | null => {
  const userString = localStorage.getItem('user');

  if (!userString) return null;

  return JSON.parse(userString);
};
