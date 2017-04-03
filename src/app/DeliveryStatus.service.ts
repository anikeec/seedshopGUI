import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import {SeedDeliveryStatusListReply} from "./SeedDeliveryStatusListReply";
import {SeedGenericReply} from "./SeedGenericReply";
import {SeedDeliveryStatus} from "./SeedDeliveryStatus";
import {LocalStorageService} from "angular-2-local-storage";

@Injectable()
export class DeliveryStatusService {
  private headers = new Headers({'Content-Type': 'application/json; charset=utf8'});
  private dstatusUrl = 'https://localhost:8443/dstatus';

  constructor(private http: Http,
              private localStService: LocalStorageService) {
  }

  getDeliveryStatuses(): Promise<SeedDeliveryStatusListReply> {
    const url = `${this.dstatusUrl}/all`;

    let tok:string = this.localStService.get<string>('token');
    let mes:string = this.headers.get('X-Authorization');
    this.headers.set('X-Authorization',tok);

    return this.http.get(url, {headers: this.headers})
      .toPromise()
      .then(response => {
        console.log("DeliveryStatus JSON: " + JSON.stringify(response.json()));
        let retDeliveryStatuses = Promise.resolve(response.json() as SeedDeliveryStatusListReply);
        return retDeliveryStatuses;
      })
      .catch(this.handleError);
  }

  delete(id: number): Promise<SeedGenericReply> {
    const url = `${this.dstatusUrl}/del/${id}`;

    let tok:string = this.localStService.get<string>('token');
    let mes:string = this.headers.get('X-Authorization');
    this.headers.set('X-Authorization',tok);

    return this.http.delete(url,{headers: this.headers})
      .toPromise()
      .then(response => {
        console.log("Delete DeliveryStatus JSON: " + JSON.stringify(response.json()));
        let deleteRequestAnswer = response.json() as SeedGenericReply;
        return deleteRequestAnswer;
      })
      .catch(this.handleError);
  }

  create(deliveryStatus:  SeedDeliveryStatus): Promise<SeedGenericReply> {
    const url = `${this.dstatusUrl}/add`;

    let mess : SeedDeliveryStatus = new SeedDeliveryStatus();
    mess.statusId = deliveryStatus.statusId;
    mess.name = deliveryStatus.name;
    mess.used = deliveryStatus.used;
    let message :String = JSON.stringify(mess);

    let tok:string = this.localStService.get<string>('token');
    let mes:string = this.headers.get('X-Authorization');
    this.headers.set('X-Authorization',tok);

    return this.http.post(url,mess,{headers: this.headers})
      .toPromise()
      .then(response =>{
        console.log("update DeliveryStatus JSON: "+JSON.stringify(response.json()));
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
