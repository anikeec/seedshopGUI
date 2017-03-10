import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';

import { SeedUser }                from './SeedUser';
import { SeedUserService }         from './SeedUser.service';

@Component({
  moduleId: module.id,
  selector: 'seed-users',
  templateUrl: './users.component.html',
  styleUrls: [ './users.component.css' ]
})
export class UsersComponent implements OnInit {
  users: SeedUser[];
  selectedUser: SeedUser;

  constructor(
    private seeduserService: SeedUserService,
    private router: Router) { }

  getUsers(): void {
    this.seeduserService
        .getUsers()
        .then(users => this.users = users);
  }

  add(name: string, email:string): void {
    name = name.trim();
    email = email.trim();
    if (!name || !email) {
      return;
    }

    let user:SeedUser = new SeedUser();
    user.login = name;
    user.email = email;
    user.isLibrarian=false;

    this.seeduserService.create(user)
      .then(user => {
        this.users.push(user);
        this.selectedUser = null;
      });
  }

  delete(user: SeedUser): void {
    this.seeduserService
        .delete(user.user_id)
        .then(() => {
          this.users = this.users.filter(h => h !== user);
          if (this.selectedUser === user) { this.selectedUser = null; }
        });
  }

  ngOnInit(): void {
    this.getUsers();
  }

  onSelect(user: SeedUser): void {
    this.selectedUser = user;
  }

  gotoDetail(): void {
    this.router.navigate(['/detail', this.selectedUser.user_id]);
  }
}
