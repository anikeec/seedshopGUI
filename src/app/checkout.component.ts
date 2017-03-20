import { Component, OnInit } from '@angular/core';


@Component({
  moduleId: module.id,
  selector: 'my-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: [ './checkout.component.css' ]
})
export class CheckoutComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

  }

  sendInvoice(secName:string,
              firstName:string,
              thirdName:string,
              email:string,
              country:string,
              region:string,
              area:string,
              city:string,
              deliveryService:string,
              deliveryOffice:string):void{
    if(secName.length >20)
      secName = secName.substr(0,20);


  }

}
