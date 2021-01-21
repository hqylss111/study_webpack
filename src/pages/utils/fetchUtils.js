import { history } from 'umi';
export const __GET = (url, requestInit) => {
  // 放入token
  requestInit = requestInit ?? {};
  requestInit.method = 'GET';
  requestInit.headers = requestInit.headers ?? {};
  // requestInit.headers['Auth-Token'] = localStorage.getItem('login');

  return fetch(url, requestInit).then(response => {
    // if (response.status === 401) {
      // history.push('/login');
    //   return false;
    // }
    return response;
  });
};
