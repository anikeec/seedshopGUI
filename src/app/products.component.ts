import { Component, OnInit } from '@angular/core';

import { SeedProduct }        from './SeedProduct';
import { SeedProductService } from './SeedProduct.service';
import {SeedProductListReply} from "./SeedProductListReply";

@Component({
  moduleId: module.id,
  selector: 'my-products',
  templateUrl: './products.component.html',
  styleUrls: [ './products.component.css' ]
})

export class ProductsComponent implements OnInit {
  results: SeedProductListReply = new SeedProductListReply();

  constructor(private seedproductService: SeedProductService) { }

  ngOnInit(): void {
    this.seedproductService.getProducts()
      .then(ret => {
        this.results = ret;
        this.checkProducts(this.results);
      }).catch(error => {
    });
  }

  checkProducts (prod: SeedProductListReply){
    let products: SeedProduct[] = prod.products;
    for(var i = 0; i < products.length; i++) {
      if(products[i].weight == "null") products[i].weight = "0";
      else products[i].weight = products[i].weight;
      if(products[i].amount.toString() == "null") products[i].amount = 0;
      else products[i].amount = products[i].amount;
    }
  }

  add(product : SeedProduct): void {
    this.seedproductService.create(product);
  }
}
