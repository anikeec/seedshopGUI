import { Component, OnInit } from '@angular/core';

import { SeedUser }        from './SeedUser';
import { SeedUserService } from './SeedUser.service';

@Component({
  moduleId: module.id,
  selector: 'my-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
  users: SeedUser[] = [];

  constructor(private seeduserService: SeedUserService) { }

  ngOnInit(): void {
    this.seeduserService.getUsers()
      .then(users => this.users = users.slice(0,10));
  }
}
