import { Injectable }    from '@angular/core';
import {Headers, Http, RequestOptions} from '@angular/http';

import 'rxjs/add/operator/toPromise';

import {SeedProductLocationListReply} from "./SeedProductLocationListReply";
import {SeedGenericReply} from "./SeedGenericReply";
import {SeedProductLocation} from "./SeedProductLocation";
import {LocalStorageService} from "angular-2-local-storage";

@Injectable()
export class ProductLocationService {
  private headers = new Headers({'Content-Type': 'application/json; charset=utf8'});
  private locationUrl = 'https://localhost:8443/plocation';

  constructor(private http: Http, private localStService: LocalStorageService) {
  }

  getProductLocations(): Promise<SeedProductLocationListReply> {
    const url = `${this.locationUrl}/all`;
    let tok:string = this.localStService.get<string>('token');
    this.headers.append('X-Authorization',tok);
    let options = new RequestOptions({ headers: this.headers });
    return this.http.get(url, options)
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
