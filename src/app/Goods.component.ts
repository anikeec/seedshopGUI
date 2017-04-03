import { Component, OnInit } from '@angular/core';

import { SeedGood }        from './SeedGood';
import { GoodsService } from './Goods.service';
import {SeedGoodListReply} from "./SeedGoodListReply";
import {Response} from "@angular/http";
import {SeedGenericReply} from "./SeedGenericReply";
import {LocalStorageService} from "angular-2-local-storage";

@Component({
  moduleId: module.id,
  selector: 'my-goods',
  templateUrl: 'Goods.component.html',
  styleUrls: [ 'Goods.component.css' ]
})

export class GoodsComponent implements OnInit {
  goodsList: SeedGoodListReply = new SeedGoodListReply();
  results: SeedGenericReply = new SeedGenericReply();

  constructor(private goodsService: GoodsService,
              private localStService: LocalStorageService) { }

  ngOnInit(): void {
    this.goodsService.getProducts()
      .then(ret => {
        this.goodsList = ret;
        this.results = ret;
        this.checkProducts(this.goodsList);
      })
      .catch((err:Response) => {
        this.errorHandler(err);
      });
  }

  checkProducts (prod: SeedGoodListReply){
    let products: SeedGood[] = prod.products;
    for(var i = 0; i < products.length; i++) {
      if(products[i].weight == "null") products[i].weight = "0";
      else products[i].weight = products[i].weight;
      if(products[i].amount.toString() == "null") products[i].amount = 0;
      else products[i].amount = products[i].amount;
    }
  }

  add(product : SeedGood): void {
    this.goodsService.create(product)
      .then(ret => {
        this.results = ret;
        if(ret.token.length != 0)
          this.localStService.set('token',ret.token);
      })
      .catch((err:Response) => {
        this.errorHandler(err);
      });
  }

  errorHandler(err:Response) {
    if(err.status == 401) {
      this.results.apiVer = null;
      this.results.error_message = 'You have not access to this function. Please enter Login and Password.'
    }
  }

}
