import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { HOST } from '../model/request-util';
import { ResponseWrapper } from '../model/response-wrapper.model';

import { Http, Response, URLSearchParams,BaseRequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { AppService } from 'app/app.service';

@Injectable()
export class AuthService {
  public token: string;
  private loginUrl = HOST + '/api/users/signin';
  private registerUrl = HOST +'/api/users//register'
  isLoggedIn:boolean=false;
   constructor( private router: Router,private http: Http, private appService: AppService) {}

  register(data){
    const options: BaseRequestOptions = new BaseRequestOptions();
    options.headers.append('Access-Control-Allow-Headers','*');
       options.headers.append('Access-Control-Allow-Origin','*');
       options.headers.append('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT');
  
    return this.http
      .post(this.registerUrl, data, options)
        .map((res) => {
          // console.log(res.json());
          return res.json();
        })
    }

    login(data){
      const options: BaseRequestOptions = new BaseRequestOptions();
      options.headers.append('Content-Type','application/json')
      options.headers.append('Accept', '*/*');
  
      options.headers.append('Access-Control-Allow-Headers', '*');
       options.headers.append('Access-Control-Allow-Origin','*');
       options.headers.append('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT');
  
      return this.http
        .post(this.loginUrl, data, options)
          .map((res) => {
            let data=res.json();
            console.log(data);
            if(data){
              localStorage.setItem('jhi-authenticationtoken', data.token);
              sessionStorage.setItem('jhi-authenticationtoken', data.username);
              sessionStorage.setItem('roles', data.roles);
              sessionStorage.setItem('username', data.username);
              console.log(data);
              sessionStorage.setItem('user_id', data.id);
              // this.appService._roles=data.roles;
              // console.log( this.appService._roles);
              console.log("okkkkkkkkkkkkkkkkkkkkkk");
              
              this.isLoggedIn=true;
              return true;
            }else{
              console.log("nonnnnnnnnnnnnnnnnnnnnnnnnnn");
              
              this.isLoggedIn=false;
              return false;
            }

          })
      }

  logout(): any {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('jhi-authenticationtoken');
    sessionStorage.removeItem('jhi-authenticationtoken');
    sessionStorage.removeItem('roles');
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('user_id');
  }


}

export const AUTH_PROVIDERS: Array<any> = [
 {provide: AuthService, useClass: AuthService},
];
