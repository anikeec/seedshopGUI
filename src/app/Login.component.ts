
import 'rxjs/add/operator/switchMap';
import { Component, OnInit }      from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location }               from '@angular/common';

import { LoginService } from './Login.service';

@Component({
  moduleId: module.id,
  selector: 'login-form',
  providers: [LoginService],
  template: `
        <div class="container" >
            <div class="title">
                Welcome
            </div>
            <div class="panel-body">
                <div class="row">
                    <div class="input-field col s12">
                        <input [(ngModel)]="user_login" id="email" 
                            type="email" class="validate">
                        <label for="email">Email</label>
                    </div>
                </div>
 
                <div class="row">
                    <div class="input-field col s12">
                        <input [(ngModel)]="user_password" id="password" 
                            type="password" class="validate">
                        <label for="password">Password</label>
                    </div>
                </div>
 
                <span>{{errorMsg}}</span>
                <button (click)="login()" 
                    class="btn waves-effect waves-light" 
                    type="submit" name="action">Login</button>
            </div>
        </div>
    	`
})

export class LoginComponent {

  public user_login:string;
  public user_password:string;
  public errorMsg = '';

  constructor(
    private loginService: LoginService,
    private route: ActivatedRoute,
    private location: Location)
  {}

  login() {
    this.loginService.login(this.user_login, this.user_password)
      .then(()=>{
          this.errorMsg = 'Successfull login';
        }
      )
      .catch(()=> {
          this.errorMsg = 'Failed to login';
        }
      )
    }

}
