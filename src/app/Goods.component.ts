import { Component, OnInit } from '@angular/core';

import { SeedGood }        from './SeedGood';
import { GoodsService } from './Goods.service';
import {SeedGoodListReply} from "./SeedGoodListReply";

@Component({
  moduleId: module.id,
  selector: 'my-goods',
  templateUrl: 'Goods.component.html',
  styleUrls: [ 'Goods.component.css' ]
})

export class GoodsComponent implements OnInit {
  results: SeedGoodListReply = new SeedGoodListReply();

  constructor(private goodsService: GoodsService) { }

  ngOnInit(): void {
    this.goodsService.getProducts()
      .then(ret => {
        this.results = ret;
        this.checkProducts(this.results);
      }).catch(error => {
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
    this.goodsService.create(product);
  }
}
