import 'rxjs/add/operator/switchMap';
import { Component, OnInit }      from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location }               from '@angular/common';

import { SeedUser }        from './SeedUser';
import { SeedUserService } from './users.service';
@Component({
  moduleId: module.id,
  selector: 'user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: [ './user-detail.component.css' ]
})

export class UserDetailComponent implements OnInit {

  seeduser: SeedUser = new SeedUser();
  user_id: number = 0;

  constructor(
    private seeduserService: SeedUserService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    // this.route.params
    //   .switchMap((params: Params) => this.seeduserService.getUser(+params['id']))
    //   .subscribe((user) => {
    //         this.seeduser = user;
    //         this.zaraza = this.seeduser.login
    //         console.log("Fuking user zaraza: "+this.zaraza);
    //   });
    this.route.params
      .subscribe((params: Params)=>{
           this.user_id = params['id'];
           console.log("PARAMS ID: " + this.user_id+"<<");
           this.seeduserService.getUser(this.user_id)
             .then((user) => {
                 this.seeduser = user;
               }
             )
        }
      )
  }

  save(): void {
   // this.seeduserService.update(this.seeduser)
   //   .then(() => this.goBack());
  }

  goBack(): void {
    this.location.back();
  }

  reload():void {
    this.seeduserService.getUser(this.user_id)
      .then((user) => {
          this.seeduser = user;
        }
      )
  }
}


