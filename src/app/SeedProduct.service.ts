import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';
import { LocalStorageService } from 'angular-2-local-storage';

import 'rxjs/add/operator/toPromise';

import { SeedProduct } from './SeedProduct';
import { SeedAddBasketQuery } from './SeedAddBasketQuery';
import { SeedAnOrderItem } from './SeedAnOrderItem';

@Injectable()
export class SeedProductService {
  private headers = new Headers({'Content-Type': 'application/json; charset=utf8' });
  private productsUrl = 'http://localhost:8080/products';  // URL to web api
  private basketUrl = 'http://localhost:8080/basket';
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

  create(product:  SeedProduct): Promise<SeedAddBasketQuery> {
    const url = `${this.basketUrl}/add`;
    let item : SeedAnOrderItem = new SeedAnOrderItem(1,product.barcode,1,"0");
    let items : SeedAnOrderItem[] = [];
    let basket = new SeedAddBasketQuery("1234567890",items);
    basket.products.push(item);
    let message :String = JSON.stringify(basket);
    return this.http.post(url,basket,{headers: this.headers})
      .toPromise()
      .then(response =>{
        console.log("ad basket create JSON: "+JSON.stringify(response.json()));
        //response.json().users[0] as SeedUser;
      })
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}


