import { Component, OnInit } from '@angular/core';
import {Router, Params, ActivatedRoute} from "@angular/router";
import {SeedUser} from "./SeedUser";
import {SeedUserService} from "./users.service";
import {SeedUserListReply} from "./SeedUserListReply";


@Component({
  moduleId: module.id,
  selector: 'my-userDetail',
  templateUrl: './userDetail.component.html',
  styleUrls: [ './userDetail.component.css' ]
})
export class UserDetailComponent implements OnInit {

  results: SeedUserListReply = new SeedUserListReply();
  user: SeedUser = new SeedUser();
  userId: number = 0;

  constructor( private usersService: SeedUserService,
               private route: ActivatedRoute,
               private router: Router) {

  }

  ngOnInit(): void {
    this.route.params
      .subscribe((params: Params)=>{
          this.userId = params['id'];
          console.log("PARAMS ID: " + this.userId+"<<");
          this.usersService.getUser(this.userId)
            .then(ret => {
                this.results = ret;
                //this.user = ret.users[0];

                //this.user_id = ret.users[0].userId;
              }
            )
        }
      )
  }

  sendUserDetail(
              userId:number,
              login:string,
              secName:string,
              firstName:string,
              thirdName:string,
              gender: string,
              email: string,
              phones: string,
              discount: string,
              birthday: string,
              country: string,
              region: string,
              area: string,
              city: string,
              temp: string,
              used: string):void{
    if(secName.length >20)
      secName = secName.substr(0,20);

    let user : SeedUser = new SeedUser();
    user.userId = userId;
    user.login = login;
    user.secName = secName;
    user.firstName = firstName;
    user.thirdName = thirdName;
    user.gender = gender;
    user.email = email;
    user.phones = phones;
    user.discount = discount;
    user.birthday = birthday;
    user.country = country;
    user.region = region;
    user.area = area;
    user.city = city;
    user.temp = temp;
    user.used = used;
/*
    this.seedinvoiceService.create(invoice)
      .then(ret => {
      this.results = ret;
      if(ret.retcode == 0) {
        this.router.navigate(['/checkoutResult']);

      }})
      .catch(error => {
      }
    );
    */
  }

}
