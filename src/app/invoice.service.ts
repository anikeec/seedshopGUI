import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import {SeedInvoice} from "./SeedInvoice";
import {SeedAddInvoiceQuery} from "./SeedAddInvoiceQuery";
import {SeedInvoiceListReply} from "./SeedInvoiceListReply";
import {SeedDeliveryStatusListReply} from "./SeedDeliveryStatusListReply";
import {LocalStorageService} from "angular-2-local-storage";

@Injectable()
export class SeedInvoiceService {
  private headers = new Headers({'Content-Type': 'application/json; charset=utf8' });
  private invoiceUrl = 'https://localhost:8443/invoices';
  private deliveryStatusUrl = 'https://localhost:8443/dstatus';
  private token:string;
  constructor(
        private http: Http,
        private localStService: LocalStorageService
  ) { }

  getInvoices(): Promise<SeedInvoice[]> {
    const url = `${this.invoiceUrl}/all`;

    let tok:string = this.localStService.get<string>('token');
    let mes:string = this.headers.get('X-Authorization');
    if(mes != null) {
      this.headers.set('X-Authorization',tok);
    } else {
      this.headers.append('X-Authorization', tok);
    }

    return this.http.get(url,{headers: this.headers})
               .toPromise()
               .then(response =>{
                 console.log("invoice JSON: "+JSON.stringify(response.json()));
                 return Promise.resolve(response.json().invoices as SeedInvoice[]);
               })
               .catch(this.handleError);
  }

  getInvoice(id: number): Promise<SeedInvoiceListReply> {
    const url = `${this.invoiceUrl}/byid/${id}`;

    let tok:string = this.localStService.get<string>('token');
    let mes:string = this.headers.get('X-Authorization');
    if(mes != null) {
      this.headers.set('X-Authorization',tok);
    } else {
      this.headers.append('X-Authorization', tok);
    }

    return this.http.get(url,{headers: this.headers})
      .toPromise()
      .then(response =>{
        console.log("invoice JSON: "+JSON.stringify(response.json()));
        let ret = Promise.resolve(response.json() as SeedInvoiceListReply);
        return ret;
      })
      .catch(this.handleError);
  }

  create(invoice:  SeedInvoice): Promise<SeedInvoiceListReply> {
    const url = `${this.invoiceUrl}/checkout`;

    let mess : SeedAddInvoiceQuery = new SeedAddInvoiceQuery("1234567890",invoice);
    let message :String = JSON.stringify(mess);

    let tok:string = this.localStService.get<string>('token');
    let mes:string = this.headers.get('X-Authorization');
    if(mes != null) {
      this.headers.set('X-Authorization',tok);
    } else {
      this.headers.append('X-Authorization', tok);
    }

    return this.http.post(url,mess,{headers: this.headers})
      .toPromise()
      .then(response =>{
        console.log("update invoice JSON: "+JSON.stringify(response.json()));
        let ret = Promise.resolve(response.json() as SeedInvoiceListReply);
        return ret;
      })
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}


