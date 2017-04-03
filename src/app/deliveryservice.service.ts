import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import {SeedDeliveryServiceListReply} from "./SeedDeliveryServiceListReply";
import {LocalStorageService} from "angular-2-local-storage";

@Injectable()
export class SeedDeliveryServiceService {
  private headers = new Headers({'Content-Type': 'application/json; charset=utf8'});
  private deliveryUrl = 'https://localhost:8443/dservice';

  constructor(private http: Http,
              private localStService: LocalStorageService) {}

  getDeliveryServices(): Promise<SeedDeliveryServiceListReply> {
    const url = `${this.deliveryUrl}/all`;

    let tok:string = this.localStService.get<string>('token');
    let mes:string = this.headers.get('X-Authorization');
    this.headers.set('X-Authorization',tok);

    return this.http.get(url, {headers: this.headers})
      .toPromise()
      .then(response => {
        console.log("Delivery services JSON: " + JSON.stringify(response.json()));
        let retDelivServices = Promise.resolve(response.json() as SeedDeliveryServiceListReply);
        return retDelivServices;
      })
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
