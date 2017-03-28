import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { SeedBasketItem } from './SeedBasketItem';

@Injectable()
export class SeedBasketService {
  private headers = new Headers({'Content-Type': 'application/json; charset=utf8' });
  private sessionId : String = "1234567890";
  private basketUrl = 'https://localhost:8443/basket';
  private token:string;
  constructor(
        private http: Http
  ) { }

  getAnOrders(): Promise<SeedBasketItem[]> {
    const url = `${this.basketUrl}/all/` + this.sessionId;
    return this.http.get(url,{headers: this.headers})
               .toPromise()
               .then(response =>{
                 console.log("basket JSON: "+JSON.stringify(response.json()));
                 return Promise.resolve(response.json().basketItems as SeedBasketItem[]);
               })
               .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}


