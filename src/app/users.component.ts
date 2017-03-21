import { Component, OnInit } from '@angular/core';

import { SeedUserService }         from './users.service';
import {SeedUserListReply} from "./SeedUserListReply";

@Component({
  moduleId: module.id,
  selector: 'seed-users',
  templateUrl: './users.component.html',
  styleUrls: [ './users.component.css' ]
})
export class UsersComponent implements OnInit {

  results: SeedUserListReply = new SeedUserListReply();

  constructor(private seeduserService: SeedUserService) { }

  ngOnInit(): void {
    this.seeduserService.getUsers()
      .then(ret => {
        this.results = ret;
        if(ret.retcode == 0) {

        }})
      .catch(error => {
        }
      );
  }
}
