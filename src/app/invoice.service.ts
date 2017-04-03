import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import {SeedInvoice} from "./SeedInvoice";
import {SeedInvoiceListReply} from "./SeedInvoiceListReply";
import {LocalStorageService} from "angular-2-local-storage";
import {SeedGenericReply} from "./SeedGenericReply";

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
    const url = `${this.invoiceUrl}/byuser`;//all

    let tok:string = this.localStService.get<string>('token');
    let mes:string = this.headers.get('X-Authorization');
    this.headers.set('X-Authorization',tok);

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
    this.headers.set('X-Authorization',tok);

    return this.http.get(url,{headers: this.headers})
      .toPromise()
      .then(response =>{
        console.log("invoice JSON: "+JSON.stringify(response.json()));
        let ret = Promise.resolve(response.json() as SeedInvoiceListReply);
        return ret;
      })
      .catch(this.handleError);
  }

  create(invoice:  SeedInvoice): Promise<SeedGenericReply> {
    const url = `${this.invoiceUrl}/checkout`;

    let mess : SeedInvoice = invoice;
    let message :String = JSON.stringify(mess);

    let tok:string = this.localStService.get<string>('token');
    let mes:string = this.headers.get('X-Authorization');
    this.headers.set('X-Authorization',tok);

    return this.http.post(url,mess,{headers: this.headers})
      .toPromise()
      .then(response =>{
        console.log("update invoice JSON: "+JSON.stringify(response.json()));
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


