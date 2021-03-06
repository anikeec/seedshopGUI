import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import {SeedPackListReply} from "./SeedPackListReply";
import {SeedGenericReply} from "./SeedGenericReply";
import {SeedPack} from "./SeedPack";
import {LocalStorageService} from "angular-2-local-storage";

@Injectable()
export class PackService {
  private headers = new Headers({'Content-Type': 'application/json; charset=utf8'});
  private locationUrl = 'https://localhost:8443/pack';

  constructor(private http: Http,
              private localStService: LocalStorageService) {}

  getPacks(): Promise<SeedPackListReply> {
    const url = `${this.locationUrl}/all`;

    let tok:string = this.localStService.get<string>('token');
    let mes: string = this.headers.get('X-Authorization');
    this.headers.set('X-Authorization', tok);


    return this.http.get(url, {headers: this.headers})
      .toPromise()
      .then(response => {
        console.log("Product location JSON: " + JSON.stringify(response.json()));
        let retPacks = Promise.resolve(response.json() as SeedPackListReply);
        return retPacks;
      })
      .catch(this.handleError);
  }

  delete(id: number): Promise<SeedGenericReply> {
    const url = `${this.locationUrl}/del/${id}`;

    let tok:string = this.localStService.get<string>('token');
    let mes:string = this.headers.get('X-Authorization');
    this.headers.set('X-Authorization',tok);

    return this.http.delete(url, {headers: this.headers})
      .toPromise()
      .then(response => {
        console.log("Delete pack JSON: " + JSON.stringify(response.json()));
        let deleteRequestAnswer = response.json() as SeedGenericReply;
        return deleteRequestAnswer;
      })
      .catch(this.handleError);
  }

  create(pack:  SeedPack): Promise<SeedGenericReply> {
    const url = `${this.locationUrl}/add`;

    let mess : SeedPack = new SeedPack();
    mess.packId = pack.packId;
    mess.name = pack.name;
    mess.used = pack.used;
    let message :String = JSON.stringify(mess);

    let tok:string = this.localStService.get<string>('token');
    let mes:string = this.headers.get('X-Authorization');
    this.headers.set('X-Authorization',tok);

    return this.http.post(url,mess,{headers: this.headers})
      .toPromise()
      .then(response =>{
        console.log("update pack JSON: "+JSON.stringify(response.json()));
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
