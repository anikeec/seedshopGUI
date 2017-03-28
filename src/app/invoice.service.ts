import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import {SeedInvoice} from "./SeedInvoice";
import {SeedAddInvoiceQuery} from "./SeedAddInvoiceQuery";
import {SeedInvoiceListReply} from "./SeedInvoiceListReply";
import {SeedDeliveryStatusListReply} from "./SeedDeliveryStatusListReply";

@Injectable()
export class SeedInvoiceService {
  private headers = new Headers({'Content-Type': 'application/json; charset=utf8' });
  private invoiceUrl = 'https://localhost:8443/invoices';
  private deliveryStatusUrl = 'https://localhost:8443/dstatus';
  private token:string;
  constructor(
        private http: Http
  ) { }

  getInvoices(): Promise<SeedInvoice[]> {
    const url = `${this.invoiceUrl}/all`;
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

  getDeliveryStatuses(): Promise<SeedDeliveryStatusListReply> {
    const url = `${this.deliveryStatusUrl}/all`;
    return this.http.get(url,{headers: this.headers})
      .toPromise()
      .then(response =>{
        console.log("deliveryStatuses JSON: "+JSON.stringify(response.json()));
        let dstatuses = Promise.resolve(response.json() as SeedDeliveryStatusListReply);
        return dstatuses;
      })
      .catch(this.handleError);
  }
}


