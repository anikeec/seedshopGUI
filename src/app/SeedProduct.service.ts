import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';
import { LocalStorageService } from 'angular-2-local-storage';

import 'rxjs/add/operator/toPromise';

import { SeedProduct } from './SeedProduct';

@Injectable()
export class SeedProductService {
  private headers = new Headers({'Content-Type': 'application/json; charset=utf8' });
  private productsUrl = 'http://localhost:8080/products';  // URL to web api
  private token:string;
  constructor(
        private http: Http,
        private localStService: LocalStorageService
  ) { }

  getProducts(): Promise<SeedProduct[]> {
    const url = `${this.productsUrl}/all`;
    return this.http.get(url,{headers: this.headers})
               .toPromise()
               .then(response =>{
                 console.log("product JSON: "+JSON.stringify(response.json()));
                 return Promise.resolve(response.json().products as SeedProduct[]);
               })
               .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}


