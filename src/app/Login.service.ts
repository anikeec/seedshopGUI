import { Injectable }    from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import { LocalStorageService } from 'angular-2-local-storage';

import 'rxjs/add/operator/toPromise';
import {SeedUser} from "./SeedUser";

@Injectable()
export class LoginService {
  private headers = new Headers({'Content-Type': 'application/json'});
  private usersUrl = 'https://localhost:8443';  // URL to web api
  private token:string;
  public loggedUser:SeedUser;

  constructor(
        private http: Http,
        private localStService: LocalStorageService
  ) { }

  login(login:string, password: string){
    this.token = "";
    const url = `${this.usersUrl}/auth`;
    let data={"login":login,"password":password};
    return this.http.post(url,data,{headers: this.headers})
      .toPromise()
      .then(response => {
         this.loggedUser = response.json().user;
         this.token = response.json().token;
         this.localStService.add('login',login);
         this.localStService.add('password',password);
         this.localStService.add('token',this.token);
      })
      .catch(this.handleError);

  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}


