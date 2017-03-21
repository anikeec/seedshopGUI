import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { SeedUserListReply } from './SeedUserListReply';

@Injectable()
export class SeedUserService {
  private headers = new Headers({'Content-Type': 'application/json; charset=utf8' });
  private usersUrl = 'http://localhost:8080/users';  // URL to web api
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

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}


