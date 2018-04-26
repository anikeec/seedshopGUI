
import 'rxjs/add/operator/switchMap';
import { Component, OnInit }      from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location }               from '@angular/common';

import { LoginService } from './Login.service';
import {SeedUser} from "./SeedUser";

@Component({
  moduleId: module.id,
  selector: 'login-form',
  providers: [LoginService],
  template: `
        <div class="container" >
            <div class="title" *ngIf="loggedUser.firstName == null">                
                Login:
            </div>
            <div class="title" *ngIf="loggedUser.firstName">                
                Welcome {{loggedUser.firstName}} {{loggedUser.secName}}
            </div>
            <div class="panel-body">
                <div class="row" *ngIf="loggedUser.firstName == null">
                    <div class="input-field col s12">
                        <input [(ngModel)]="user_login" id="email" 
                            type="email" class="validate">
                        <label for="email">Email</label>
                    </div>
                </div>
 
                <div class="row" *ngIf="loggedUser.firstName == null">
                    <div class="input-field col s12">
                        <input [(ngModel)]="user_password" id="password" 
                            type="password" class="validate">
                        <label for="password">Password</label>
                    </div>
                </div>
 
                <!--<span>{{errorMsg}}</span>-->
                <div *ngIf="loggedUser.firstName == null">
                  <button (click)="login()" class="btn waves-effect waves-light" type="submit" name="action">Login</button>
                </div>
                <div *ngIf="loggedUser.firstName">
                  <button (click)="exit()" class="btn waves-effect waves-light" type="submit" name="action">Exit</button>
                </div>
            </div>
        </div>
    	`
})

export class LoginComponent {

  public user_login:string;
  public user_password:string;
  public errorMsg = '';
  public loggedUser: SeedUser = new SeedUser();

  constructor(
    private loginService: LoginService,
    private route: ActivatedRoute,
    private location: Location)
  {}

  ngOnInit(): void {
    if(this.loginService.getUser() != null)
      this.loggedUser = this.loginService.getUser();
  }



  login() {
    this.loginService.login(this.user_login, this.user_password)
      .then(ret => {
          this.errorMsg = 'Successfull login';
          this.loggedUser = ret;
        }
      )
      .catch(()=> {
          this.errorMsg = 'Failed to login';
        }
      )
    }

  exit() {
    this.loginService.exit();
    this.loggedUser = new SeedUser();
  }

}
