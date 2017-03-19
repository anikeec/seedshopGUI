import { Component, OnInit } from '@angular/core';

import { SeedBasketService } from './SeedBasket.service';
import { SeedBasketItem } from './SeedBasketItem';

@Component({
  moduleId: module.id,
  selector: 'my-basket',
  templateUrl: './basket.component.html',
  styleUrls: [ './basket.component.css' ]
})
export class BasketComponent implements OnInit {
  basketItems: SeedBasketItem[] = [];

  constructor(private seedbasketService: SeedBasketService) { }

  ngOnInit(): void {
    this.seedbasketService.getAnOrders()
      .then(basketItems => this.basketItems = basketItems);
  }

  multiply(in1:number, in2:number) : string {
    return (in1 * in2).toFixed(2);
  }

  quentity:number = 0;
  temp:number = 0;

  countAll():number{
    let temp:number = 0;
    this.counterZero();
    for(let i:number=0;i<this.basketItems.length;i++) {
      temp = Number(this.basketItems[i].product.price);
      this.counterAdd(this.basketItems[i].count * temp);
    }
    return this.counterResult();
  }

  counterZero():void {
    this.quentity = 0;
  }

  counterAdd(inp:number):void {
    this.quentity = this.quentity + inp;
  }

  counterResult():number {
    return this.quentity;
  }
}
