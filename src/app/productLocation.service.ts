import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import {SeedProductLocationListReply} from "./SeedProductLocationListReply";

@Injectable()
export class ProductLocationService {
  private headers = new Headers({'Content-Type': 'application/json; charset=utf8'});
  private locationUrl = 'http://localhost:8080/plocation';

  constructor(private http: Http) {
  }

  getProductLocations(): Promise<SeedProductLocationListReply> {
    const url = `${this.locationUrl}/all`;
    return this.http.get(url, {headers: this.headers})
      .toPromise()
      .then(response => {
        console.log("Product location JSON: " + JSON.stringify(response.json()));
        let retPlocations = Promise.resolve(response.json() as SeedProductLocationListReply);
        return retPlocations;
      })
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
