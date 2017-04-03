import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import {SeedProductListReply} from "./SeedProductListReply";
import {SeedGenericReply} from "./SeedGenericReply";
import {SeedProduct} from "./SeedProduct";
import {LocalStorageService} from "angular-2-local-storage";

@Injectable()
export class ProductService {
  private headers = new Headers({'Content-Type': 'application/json; charset=utf8'});
  private locationUrl = 'https://localhost:8443/products';

  constructor(private http: Http,
              private localStService: LocalStorageService) {}

  getProducts(): Promise<SeedProductListReply> {
    const url = `${this.locationUrl}/all`;

    let tok:string = this.localStService.get<string>('token');
    let mes: string = this.headers.get('X-Authorization');
    this.headers.set('X-Authorization', tok);

    return this.http.get(url, {headers: this.headers})
      .toPromise()
      .then(response => {
        console.log("Product location JSON: " + JSON.stringify(response.json()));
        let retProducts = Promise.resolve(response.json() as SeedProductListReply);
        return retProducts;
      })
      .catch(this.handleError);
  }

  delete(barcode: string): Promise<SeedGenericReply> {
    const url = `${this.locationUrl}/del/${barcode}`;

    let tok:string = this.localStService.get<string>('token');
    let mes:string = this.headers.get('X-Authorization');
    this.headers.set('X-Authorization',tok);

    return this.http.delete(url, {headers: this.headers})
      .toPromise()
      .then(response => {
        console.log("Delete Product JSON: " + JSON.stringify(response.json()));
        let deleteRequestAnswer = response.json() as SeedGenericReply;
        return deleteRequestAnswer;
      })
      .catch(this.handleError);
  }

  create(product:  SeedProduct): Promise<SeedGenericReply> {
    const url = `${this.locationUrl}/add`;

    let mess : SeedProduct = new SeedProduct();
    mess.barcode = product.barcode;
    mess.aProductId = product.aProductId;
    mess.packingId = product.packingId;
    mess.manufactId = product.manufactId;
    mess.price = product.price;
    mess.used = product.used;
    let message :String = JSON.stringify(mess);

    let tok:string = this.localStService.get<string>('token');
    let mes:string = this.headers.get('X-Authorization');
    this.headers.set('X-Authorization',tok);

    return this.http.post(url,mess,{headers: this.headers})
      .toPromise()
      .then(response =>{
        console.log("update Product JSON: "+JSON.stringify(response.json()));
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
