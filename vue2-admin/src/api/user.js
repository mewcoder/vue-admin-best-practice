import http from './http';

function getUserInfo(data) {
  return http.post('/user/info', data);
}

export { getUserInfo };
