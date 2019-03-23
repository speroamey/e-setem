import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { HOST, createRequestOption } from '../../../shared/model/request-util';
// import { ResponseWrapper } from '../model/response-wrapper.model';

import { Http, Response, URLSearchParams, BaseRequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';;

@Injectable()
export class AptitudesModalService {
  public token: string;
  private plainteUrl = HOST + '/api/rh/aptitudes/';
  private competenceBrancheUrl = HOST + '/api/rh/competences_branches_aptitudes/'
  private competenceUrl = HOST + '/api/parametres/competences/';
  private branchesUrl = HOST + '/api/parametres/branches/';
  constructor(private router: Router, private http: Http) {
    //  var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    //  this.token = currentUser && currentUser.token;
  }

  load(user_id) {
    const options: BaseRequestOptions = createRequestOption();
    options.headers.append('Content-Type', 'application/json')
    return this.http
      .get(`${this.plainteUrl + 'list'}/${user_id}`, options)
      .map((res) => {
        return res;
      })
  }

  loadCompetences() {
    const options: BaseRequestOptions = createRequestOption();
    options.headers.append('Content-Type', 'application/json')

    return this.http
      .get(this.competenceUrl + 'list', options)
      .map((res) => {
        return res;
      })
  }

  loadBranches(id) {
    const options: BaseRequestOptions = createRequestOption();
    options.headers.append('Content-Type', 'application/json')
    // console.log(id);

    return this.http
      .get(`${this.branchesUrl + 'list'}/${id}`, options)
      .map((res) => {
        // console.log(res);
        return res;
      })
  }



  loadCompetencesBranches(id) {
    const options: BaseRequestOptions = createRequestOption();
    options.headers.append('Content-Type', 'application/json')
    return this.http
      .get(`${this.competenceBrancheUrl + 'list'}/${id}`, options)
      .map((res) => {
        // console.log(res);
        return res;
      })
  }

  add(data) {
    const options: BaseRequestOptions = createRequestOption();
    options.headers.append('Content-Type', 'application/json')
    // console.log(data);
    return this.http
      .post(this.plainteUrl + 'add', data, options)
      .map((res) => {
        return res;
      })
  }

  update(id, data) {
    const options: BaseRequestOptions = createRequestOption();
    options.headers.append('Content-Type', 'application/json')
    return this.http
      .put(`${this.plainteUrl + 'update'}/${id}`, data, options)
      .map((res) => {
        return res;
      })
  }


  update_c_b_a(id, data) {
    const options: BaseRequestOptions = createRequestOption();
    options.headers.append('Content-Type', 'application/json')
    return this.http
      .put(`${this.competenceBrancheUrl + 'update'}/${id}`, data, options)
      .map((res) => {
        return res;
      })
  }

  remove(id) {
    // console.log(id);
    const options: BaseRequestOptions = createRequestOption();
    options.headers.append('Content-Type', 'application/json')
    return this.http.delete(`${this.plainteUrl + 'delete'}/${id}`, options)
      .map((res) => {
        return res;
      });
  }

  removeCompetenceBranche(id) {
    // console.log(id);
    const options: BaseRequestOptions = createRequestOption();
    options.headers.append('Content-Type', 'application/json')
    return this.http.delete(`${this.competenceBrancheUrl + 'delete'}/${id}`, options)
      .map((res) => {
        return res;
      });
  }
}
