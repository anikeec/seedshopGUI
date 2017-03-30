import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';
import { LocalStorageService } from 'angular-2-local-storage';

import 'rxjs/add/operator/toPromise';

import { SeedGood } from './SeedGood';
import { SeedAddBasketQuery } from './SeedAddBasketQuery';
import { SeedAnOrderItem } from './SeedAnOrderItem';
import {SeedGoodListReply} from "./SeedGoodListReply";

@Injectable()
export class GoodsService {
  private headers = new Headers({'Content-Type': 'application/json; charset=utf8' });
  private productsUrl = 'https://localhost:8443/products';  // URL to web api
  private basketUrl = 'https://localhost:8443/basket';
  private token:string = '';
  constructor(
        private http: Http,
        private localStService: LocalStorageService
  ) { }

  getProducts(): Promise<SeedGoodListReply> {
    const url = `${this.productsUrl}/all`;

    let tok:string = this.localStService.get<string>('token');
    if(tok.length == 64) {
      let mes: string = this.headers.get('X-Authorization');
      if (mes != null) {
        this.headers.set('X-Authorization', tok);
      } else {
        this.headers.append('X-Authorization', tok);
      }
    }

    return this.http.get(url,{headers: this.headers})
               .toPromise()
               .then(response =>{
                 console.log("product JSON: "+JSON.stringify(response.json()));
                 let ret = Promise.resolve(response.json() as SeedGoodListReply);
                 return ret;
               })
               .catch(this.handleError);
  }

  create(product:  SeedGood): Promise<SeedAddBasketQuery> {
    const url = `${this.basketUrl}/add`;
    let item : SeedAnOrderItem = new SeedAnOrderItem("1",product.barcode,1,"0");
    let items : SeedAnOrderItem[] = [];
    let basket = new SeedAddBasketQuery("1234567890",items);
    basket.products.push(item);
    let message :String = JSON.stringify(basket);
    let tok:string = this.localStService.get<string>('token');
    let mes:string = this.headers.get('X-Authorization');
    if(mes != null) {
      this.headers.set('X-Authorization',tok);
    } else {
      this.headers.append('X-Authorization', tok);
    }
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


