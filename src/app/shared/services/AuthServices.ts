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

   constructor( private router: Router,private http: Http, private appService: AppService) {}

  register(data){
    const options: BaseRequestOptions = new BaseRequestOptions();
    options.headers.append('Content-Type','application/json')

    return this.http
      .post(this.registerUrl, data, options)
        .map((res) => {
          console.log(res.json());
          return res.json();


        })
    }

    login(data){
      const options: BaseRequestOptions = new BaseRequestOptions();
      return this.http
        .post(this.loginUrl, data, options)
          .map((res) => {
            let data=res.json();
            console.log(data);
            if(data){
              localStorage.setItem('jhi-authenticationtoken', data.token);
              sessionStorage.setItem('jhi-authenticationtoken', data.username);
              sessionStorage.setItem('roles', data.roles);
              console.log(data);
              
              sessionStorage.setItem('user_id', data.id);
              // this.appService._roles=data.roles;
              // console.log( this.appService._roles);
              
              return true;
            }else{
              return false;
            }

          })
      }

  // login(user: string, password: string): boolean {
  //
  //
  //
  //   if (user === 'user' && password === 'password') {
  //     localStorage.setItem('username', user);
  //     this.router.navigate(['/dashboard']);
  //     return true;
  //   }
  //   this.router.navigate(['/login']);
  //   return false;
  // }

  logout(): any {
    localStorage.removeItem('currentUser');
  }


}

export const AUTH_PROVIDERS: Array<any> = [
 {provide: AuthService, useClass: AuthService},
];
