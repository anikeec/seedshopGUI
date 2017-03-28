import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { SeedUserListReply } from './SeedUserListReply';
import {SeedUserGenderListReply} from "./SeedUserGenderListReply";

@Injectable()
export class SeedUserService {
  private headers = new Headers({'Content-Type': 'application/json; charset=utf8' });
  private usersUrl = 'https://localhost:8443/users';  // URL to web api
  private userGendersUrl = 'https://localhost:8443/ugender';
  constructor(
        private http: Http
  ) { }

  getUsers(): Promise<SeedUserListReply> {
    const url = `${this.usersUrl}/all`;
    return this.http.get(url,{headers: this.headers})
      .toPromise()
      .then(response =>{
        console.log("users JSON: "+JSON.stringify(response.json()));
        let ret = Promise.resolve(response.json() as SeedUserListReply);
        return ret;
      })
      .catch(this.handleError);
  }

  getUser(id: number): Promise<SeedUserListReply> {
    const url = `${this.usersUrl}/byid/${id}`;
    return this.http.get(url,{headers: this.headers})
      .toPromise()
      .then(response =>{
        console.log("get user JSON: "+JSON.stringify(response.json()));
        let ret = Promise.resolve(response.json() as SeedUserListReply);
        return ret;
      })
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  getUserGenders(): Promise<SeedUserGenderListReply> {
    const url = `${this.userGendersUrl}/all`;
    return this.http.get(url,{headers: this.headers})
      .toPromise()
      .then(response =>{
        console.log("userGenders JSON: "+JSON.stringify(response.json()));
        let ret = Promise.resolve(response.json() as SeedUserGenderListReply);
        return ret;
      })
      .catch(this.handleError);
  }
}


