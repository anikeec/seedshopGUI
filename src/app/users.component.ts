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
            if((ret.users[i].login == null) || (ret.users[i].login == 'null'))
              ret.users[i].login = "";
            if((ret.users[i].role == null) || (ret.users[i].role == 'null'))
              ret.users[i].role = "";
            if((ret.users[i].secName == null) || (ret.users[i].secName == 'null'))
              ret.users[i].secName = "";
            if((ret.users[i].firstName == null) || (ret.users[i].firstName == 'null'))
              ret.users[i].firstName = "";
            if((ret.users[i].thirdName == null) || (ret.users[i].thirdName == 'null'))
              ret.users[i].thirdName = "";
            if(ret.users[i].genderId == null)
              ret.users[i].genderId = 0;
            if((ret.users[i].email == null) || (ret.users[i].email == 'null'))
              ret.users[i].email = "";
            if((ret.users[i].phones == null) || (ret.users[i].phones == 'null'))
              ret.users[i].phones = "";
            if((ret.users[i].discount == null) || (ret.users[i].discount == 'null'))
              ret.users[i].discount = "";
            if((ret.users[i].birthday == null) || (ret.users[i].birthday == 'null'))
              ret.users[i].birthday = "";
            if((ret.users[i].country == null) || (ret.users[i].country == 'null'))
              ret.users[i].country = "";
            if((ret.users[i].region == null) || (ret.users[i].region == 'null'))
              ret.users[i].region = "";
            if((ret.users[i].area == null) || (ret.users[i].area == 'null'))
              ret.users[i].area = "";
            if((ret.users[i].city == null) || (ret.users[i].city == 'null'))
              ret.users[i].city = "";
            if((ret.users[i].temp == null) || (ret.users[i].temp == 'null'))
              ret.users[i].temp = "";
            if((ret.users[i].used == null) || (ret.users[i].used == 'null'))
              ret.users[i].used = "";
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
