import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';
import { LocalStorageService } from 'angular-2-local-storage';

import 'rxjs/add/operator/toPromise';

import { SeedUser } from './SeedUser';

@Injectable()
export class SeedUserService {
  private headers = new Headers({'Content-Type': 'application/json'});
  private usersUrl = 'http://localhost:8080/users';  // URL to web api
  private token:string;
  constructor(
        private http: Http,
        private localStService: LocalStorageService
  ) { }

  login(login:string, password: string){
    //TODO: implement later
    this.token = "12345678";
    this.localStService.add('login',login);
    this.localStService.add('password',login);
    this.localStService.add('token',this.token);
    this.headers.append('Authorization: Bearer',this.token);
  }

  getUsers(): Promise<SeedUser[]> {
    const url = `${this.usersUrl}/all`;
    return this.http.get(url,{headers: this.headers})
               .toPromise()
               .then(response =>{
                 console.log("user JSON: "+JSON.stringify(response.json()));
                 return Promise.resolve(response.json().users as SeedUser[]);
               })
               .catch(this.handleError);
  }

//example of debug of promise
  getUser(id: number): Promise<SeedUser> {
    const url = `${this.usersUrl}/byid/${id}`;
    return this.http.get(url,{headers: this.headers}).toPromise()
         .then(response => {
          let user: SeedUser;
          console.log("user JSON: "+JSON.stringify(response.json()));
          user = response.json().users[0];
          console.log("User: "+user.login)
          return Promise.resolve(user);
        })
       .catch(
        this.handleError
       );
  }

  create(user:  SeedUser): Promise<SeedUser> {
    const url = `${this.usersUrl}/add`;
    let data={"user":null};
    data.user = user;
    return this.http.post(url,data,{headers: this.headers})
      .toPromise()
      .then(response =>{
        console.log("user create JSON: "+JSON.stringify(response.json()));
        response.json().users[0] as SeedUser;
      })
      .catch(this.handleError);
  }

  update(user:  SeedUser): Promise<SeedUser> {
    const url = `${this.usersUrl}/update`;
    let data={"user":null};
    data.user = user;
    return this.http.post(url,data,{headers: this.headers})
      .toPromise()
      .then(response => response.json().users[0] as SeedUser)
      .catch(this.handleError);;
  }

  delete(id: number): Promise<number> {
      const url = `${this.usersUrl}/del/${id}`;
       return this.http.get(url)
      .toPromise()
      .then(response => response.json().retcode as number)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}


