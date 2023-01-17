const UESR_KEY = 'userInfo';

const isLogin = () => {
  return !!localStorage.getItem(UESR_KEY);
};

const getCodes = () => {
  if (localStorage.getItem('userInfo')) {
    return JSON.parse(localStorage.getItem('userInfo')).codes || [];
  } else {
    return [];
  }
};

const getRole = () => {
  if (localStorage.getItem('userInfo')) {
    return JSON.parse(localStorage.getItem('userInfo')).role || '';
  } else {
    return '';
  }
};

const getUser = () => {
  return localStorage.getItem(UESR_KEY);
};

const setUser = user => {
  localStorage.setItem(UESR_KEY, JSON.stringify(user));
};

const clearUser = () => {
  localStorage.removeItem(UESR_KEY);
};

export { isLogin, getUser, setUser, clearUser, getCodes, getRole };
