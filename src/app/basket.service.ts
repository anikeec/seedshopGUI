import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { SeedBasketItem } from './SeedBasketItem';
import {LocalStorageService} from "angular-2-local-storage";
import {SeedGenericReply} from "./SeedGenericReply";

@Injectable()
export class SeedBasketService {
  private headers = new Headers({'Content-Type': 'application/json; charset=utf8' });
  private basketUrl = 'https://localhost:8443/basket';
  private token:string;
  constructor(
        private http: Http,
        private localStService: LocalStorageService
  ) { }

  getAnOrders(): Promise<SeedBasketItem[]> {
    const url = `${this.basketUrl}/all`;

    let tok:string = this.localStService.get<string>('token');
      let mes: string = this.headers.get('X-Authorization');
      if (mes != null) {
        this.headers.set('X-Authorization', tok);
      } else {
        this.headers.append('X-Authorization', tok);
      }

    return this.http.get(url,{headers: this.headers})
               .toPromise()
               .then(response =>{
                 console.log("basket JSON: "+JSON.stringify(response.json()));
                 return Promise.resolve(response.json().basketItems as SeedBasketItem[]);
               })
               .catch(this.handleError);
  }

  delete(id: string): Promise<SeedGenericReply> {
    const url = `${this.basketUrl}/del/order/${id}`;

    let tok:string = this.localStService.get<string>('token');
    let mes:string = this.headers.get('X-Authorization');
    if(mes != null) {
      this.headers.set('X-Authorization',tok);
    } else {
      this.headers.append('X-Authorization', tok);
    }

    return this.http.delete(url, { headers: this.headers })
      .toPromise()
      .then(response => {
        console.log("Delete basket JSON: " + JSON.stringify(response.json()));
        let deleteRequestAnswer = response.json() as SeedGenericReply;
        return deleteRequestAnswer;
      })
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}


