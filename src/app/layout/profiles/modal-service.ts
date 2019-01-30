import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { HOST, createRequestOption } from '../../shared/model/request-util';
// import { ResponseWrapper } from '../model/response-wrapper.model';

import { Http, Response, URLSearchParams,BaseRequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';;

@Injectable()
export class UsersModalService {
  public token: string;
  private plainteUrl = HOST + '/api/users/';

   constructor( private router: Router,private http: Http) {
    //  var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    //  this.token = currentUser && currentUser.token;
   }


   find(id){
    const options: BaseRequestOptions = createRequestOption();
    options.headers.append('Content-Type','application/json')

    return this.http
    .get(`${this.plainteUrl+'find'}/${id}`, options)
      .map((res) => {
        return res;
      })
  }

   load(){
     const options: BaseRequestOptions = createRequestOption();
     options.headers.append('Content-Type','application/json')

     return this.http
       .get(this.plainteUrl+'list', options)
         .map((res) => {
           return res;
         })
     }

  add(data){
    const options: BaseRequestOptions = createRequestOption();
    options.headers.append('Content-Type','application/json')
    // console.log(data);
    return this.http
      .post(this.plainteUrl+'register', data, options)
        .map((res) => {
          return res;
        })
    }

    update(id,data){
      const options: BaseRequestOptions = createRequestOption();
      options.headers.append('Content-Type','application/json')
      return this.http
        .put(`${this.plainteUrl+'update'}/${id}`, data, options)
          .map((res) => {
            return res;
          })
      }

      updatePass(id,data){
        const options: BaseRequestOptions = createRequestOption();
        options.headers.append('Content-Type','application/json')
        return this.http
          .put(`${this.plainteUrl+'password'}/${id}`, data, options)
            .map((res) => {
              return res;
            })
        }

    remove(id){
      console.log(id);
      const options: BaseRequestOptions = createRequestOption();
      options.headers.append('Content-Type','application/json')
      return this.http.delete(`${this.plainteUrl+'delete'}/${id}`, options)
      .map((res) => {
        return res;
      });
    }
}