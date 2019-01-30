import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { CompetencesComponent } from './competences.component';
// import { productsList } from '../products/productslist';
import { CompetencesModel } from './competences.model.component';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class CompetencesService {

  private productslist = 'assets/json/products.json';

  constructor(private http: HttpClient) {

  }


  // getOrders(): Observable<Products[]> {
  //   return this.http.get<Products[]>(this.productslist);
  // }

  // getProductsList(sort: string, order: string, page: number): Observable<productsList> {
  //   const href = 'assets/json/productslist.json';
  //   const requestUrl = `${href}?q=repo:angular/material2&sort=${sort}&order=${order}&page=${page + 1}`;
  //   return this.http.get<productsList>(requestUrl);
  // }

  // getProduct(id): Observable<ProductsForm> {
  //   const href = 'assets/json/get_product.json';
  //   return this.http.get<ProductsForm>(href);
  // }


  // updateProduct(products: ProductsForm): Observable<any> {
  //   const href = 'http://localhost/angular/server/update_products.php';
  //   return this.http.post<ProductsForm>(href, products);
  // }

  // createProduct(products: ProductsForm): Observable<any> {
  //   const href = 'http://localhost/angular/server/add_products.php';
  //   return this.http.post<ProductsForm>(href, products);
  // }










}
