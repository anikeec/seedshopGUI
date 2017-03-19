import { Component, OnInit } from '@angular/core';

import { SeedProduct }        from './SeedProduct';
import { SeedProductService } from './SeedProduct.service';

@Component({
  moduleId: module.id,
  selector: 'my-products',
  templateUrl: './products.component.html',
  styleUrls: [ './products.component.css' ]
})

export class ProductsComponent implements OnInit {
  products: SeedProduct[] = [];

  constructor(private seedproductService: SeedProductService) { }

  ngOnInit(): void {
    this.seedproductService.getProducts()
      .then(products => this.products = products).then(products => this.checkProducts(this.products));//products => this.products = products
  }

  checkProducts (products: SeedProduct[]){
    for(var i = 0; i < products.length; i++) {
      if(products[i].weight == "null") this.products[i].weight = "0";
      else this.products[i].weight = products[i].weight;
      if(products[i].amount.toString() == "null") this.products[i].amount = 0;
      else this.products[i].amount = products[i].amount;
    }
  }

  add(product : SeedProduct): void {
    this.seedproductService.create(product);
  }
}
