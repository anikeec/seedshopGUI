import { Component, OnInit } from '@angular/core';

import { SeedBasketService } from './basket.service';
import { SeedBasketItem } from './SeedBasketItem';
import {Response} from "@angular/http";
import {SeedGenericReply} from "./SeedGenericReply";

@Component({
  moduleId: module.id,
  selector: 'my-basket',
  templateUrl: './basket.component.html',
  styleUrls: [ './basket.component.css' ]
})
export class BasketComponent implements OnInit {
  basketItems: SeedBasketItem[] = [];
  results: SeedGenericReply = new SeedGenericReply();

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

  delete(id: string): void {
    this.seedbasketService.delete(id)
      .then(deleteRequestAnswer => {
        this.results = deleteRequestAnswer;
        return this.reload();
      })
      .catch((err:Response) => {
        this.errorHandler(err);
      });
  }

  reload():void {
    this.seedbasketService.getAnOrders()
      .then(basketItems => {
        this.basketItems = basketItems;
      })
      .catch((err:Response) => {
        this.errorHandler(err);
      });
  }

  errorHandler(err:Response) {
    if(err.status == 401) {
      this.results.error_message = 'You have not access to this function. Please enter Login and Password.'
    }
  }
}
