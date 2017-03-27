import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import {SeedPackingListReply} from "./SeedPackingListReply";
import {SeedGenericReply} from "./SeedGenericReply";
import {SeedPacking} from "./SeedPacking";

@Injectable()
export class PackingService {
  private headers = new Headers({'Content-Type': 'application/json; charset=utf8'});
  private locationUrl = 'http://localhost:8080/packing';

  constructor(private http: Http) {
  }

  getPackings(): Promise<SeedPackingListReply> {
    const url = `${this.locationUrl}/all`;
    return this.http.get(url, {headers: this.headers})
      .toPromise()
      .then(response => {
        console.log("Product location JSON: " + JSON.stringify(response.json()));
        let retPackings = Promise.resolve(response.json() as SeedPackingListReply);
        return retPackings;
      })
      .catch(this.handleError);
  }

  delete(id: number): Promise<SeedGenericReply> {
    const url = `${this.locationUrl}/del/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => {
        console.log("Delete Packing JSON: " + JSON.stringify(response.json()));
        let deleteRequestAnswer = response.json() as SeedGenericReply;
        return deleteRequestAnswer;
      })
      .catch(this.handleError);
  }

  create(packing:  SeedPacking): Promise<SeedGenericReply> {
    const url = `${this.locationUrl}/add`;

    let mess : SeedPacking = new SeedPacking();
    mess.packingId = packing.packingId;
    mess.packId = packing.packId;
    mess.weight = packing.weight;
    mess.amount = packing.amount;
    mess.used = packing.used;
    let message :String = JSON.stringify(mess);
    return this.http.post(url,mess,{headers: this.headers})
      .toPromise()
      .then(response =>{
        console.log("update Packing JSON: "+JSON.stringify(response.json()));
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
