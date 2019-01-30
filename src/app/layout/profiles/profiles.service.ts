import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { ProfilesComponent } from './profiles.component';
import { BranchesComponentModel } from './profiles.model.component';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class ProfilesService {

  private productslist = 'assets/json/products.json';

  constructor(private http: HttpClient) {

  }









}
