import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import {SeedManufactureListReply} from "./SeedManufactureListReply";
import {SeedGenericReply} from "./SeedGenericReply";
import {SeedManufacture} from "./SeedManufacture";

@Injectable()
export class ManufactureService {
  private headers = new Headers({'Content-Type': 'application/json; charset=utf8'});
  private locationUrl = 'http://localhost:8080/manufacture';

  constructor(private http: Http) {
  }

  getManufactures(): Promise<SeedManufactureListReply> {
    const url = `${this.locationUrl}/all`;
    return this.http.get(url, {headers: this.headers})
      .toPromise()
      .then(response => {
        console.log("Product location JSON: " + JSON.stringify(response.json()));
        let retManufactures = Promise.resolve(response.json() as SeedManufactureListReply);
        return retManufactures;
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

  create(manufacture:  SeedManufacture): Promise<SeedGenericReply> {
    const url = `${this.locationUrl}/add`;

    let mess : SeedManufacture = new SeedManufacture();
    mess.manufactureId = manufacture.manufactureId;
    mess.name = manufacture.name;
    mess.adress = manufacture.adress;
    mess.used = manufacture.used;
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
