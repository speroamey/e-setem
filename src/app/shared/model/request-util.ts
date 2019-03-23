import { URLSearchParams, BaseRequestOptions } from '@angular/http';
export let HOST: string =  'http://e-setem.bj';
// 'http://e-setem.bj';
// 'http://127.0.0.1';

export const createRequestOption = (req?: any,accept:boolean=false): BaseRequestOptions => {
  const options: BaseRequestOptions = new BaseRequestOptions();
  if (req) {
    const params: URLSearchParams = new URLSearchParams();
    params.set('page', req.page);
    params.set('size', req.size);
    if (req.sort) {
      params.paramsMap.set('sort', req.sort);
    }
    params.set('query', req.query);

    options.params = params;
  }
  let token =
    window.localStorage.getItem('jhi-authenticationtoken');
    window.sessionStorage.getItem('jhi-authenticationtoken');


    options.headers.append('Accept', '*/*');

    options.headers.append(
       'Access-Control-Allow-Headers','*');
     options.headers.append('Access-Control-Allow-Origin',  '*');
     options.headers.append('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT');
    //  options.headers.append('Content-Type', 'application/json');
  if (token) {
      // token = token.replace(/^["']/, '');
       token = token.replace(/["']$/, '');
       options.headers.append('Authorization', 'Bearer ' + token);
  }
  return options;
};
export const getUniqueId = (
  prefix: string | number = '0',
  suffix: string | number = '0'
) => {

  return '' + Date.now();
};
