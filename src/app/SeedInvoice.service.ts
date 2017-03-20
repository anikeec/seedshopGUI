import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import {SeedInvoice} from "./SeedInvoice";

@Injectable()
export class SeedInvoiceService {
  private headers = new Headers({'Content-Type': 'application/json; charset=utf8' });
  private invoiceUrl = 'http://localhost:8080/invoices';
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

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}


