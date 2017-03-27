import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import {SeedProductLocationListReply} from "./SeedProductLocationListReply";
import {SeedGenericReply} from "./SeedGenericReply";
import {SeedProductLocation} from "./SeedProductLocation";

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

  delete(id: number): Promise<SeedGenericReply> {
    const url = `${this.locationUrl}/del/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => {
        console.log("Delete product location JSON: " + JSON.stringify(response.json()));
        let deleteRequestAnswer = response.json() as SeedGenericReply;
        return deleteRequestAnswer;
      })
      .catch(this.handleError);
  }

  create(productLocation:  SeedProductLocation): Promise<SeedGenericReply> {
    const url = `${this.locationUrl}/add`;

    let mess : SeedProductLocation = new SeedProductLocation();
    mess.locationId = productLocation.locationId;
    mess.name = productLocation.name;
    mess.used = productLocation.used;
    let message :String = JSON.stringify(mess);
    return this.http.post(url,mess,{headers: this.headers})
      .toPromise()
      .then(response =>{
        console.log("update productLocation JSON: "+JSON.stringify(response.json()));
        let ret = Promise.resolve(response.json() as SeedGenericReply);
        return ret;
      })
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
