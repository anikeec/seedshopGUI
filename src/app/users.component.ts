import { Component, OnInit } from '@angular/core';

import { SeedUserService }         from './users.service';
import {SeedUserListReply} from "./SeedUserListReply";
import {Router} from "@angular/router";

@Component({
  moduleId: module.id,
  selector: 'seed-users',
  templateUrl: './users.component.html',
  styleUrls: [ './users.component.css' ]
})
export class UsersComponent implements OnInit {

  results: SeedUserListReply = new SeedUserListReply();
  userRole: string;

  constructor(private seeduserService: SeedUserService, private router: Router) { }

  ngOnInit(): void {
    this.seeduserService.getUsers()
      .then(ret => {
        this.results = ret;
        if(ret.retcode == 0) {
          for(var i=0; i<ret.users.length;i++) {
            if (ret.users[i].role === "ROLE_USER") {
              this.results.users[i].role = "USER";
            } else if (ret.users[i].role === "ROLE_ADMIN") {
              this.results.users[i].role = "ADMIN";
            }  else if (ret.users[i].role === "ROLE_MANAGER") {
              this.results.users[i].role = "MANAGER";
            }
          }
        }})
      .catch(error => {
        }
      );
  }

  gotoEdit(userId:number): void {
    this.router.navigate(['/userDetail', userId]);
  }
}
