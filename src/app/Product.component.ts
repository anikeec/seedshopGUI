import { Component, OnInit } from '@angular/core';

import {Router} from "@angular/router";
import {SeedProduct} from "./SeedProduct";
import {ProductService} from "./Product.service";
import {SeedProductListReply} from "./SeedProductListReply";
import {SeedGenericReply} from "./SeedGenericReply";
import {PackingService} from "./Packing.service";
import {SeedPackingListReply} from "./SeedPackingListReply";
import {SeedManufactureListReply} from "./SeedManufactureListReply";
import {SeedPackListReply} from "./SeedPackListReply";
import {ManufactureService} from "./Manufacture.service";
import {PackService} from "./Pack.service";

@Component({
  moduleId: module.id,
  selector: 'my-product',
  templateUrl: './product.component.html',
  styleUrls: [ './product.component.css' ]
})
export class ProductComponent implements OnInit {
  productList: SeedProductListReply = new SeedProductListReply();
  productNew: SeedProduct = new SeedProduct();
  results: SeedGenericReply = new SeedGenericReply();
  packingList: SeedPackingListReply = new SeedPackingListReply();
  manufactureList: SeedManufactureListReply = new SeedManufactureListReply();
  packList: SeedPackListReply = new SeedPackListReply();

  constructor(private productService: ProductService,
              private packingService: PackingService,
              private manufactureService: ManufactureService,
              private packService: PackService,
              private router: Router) { }

  ngOnInit(): void {

    this.packingService.getPackings()
      .then(retPackings => {
        this.packingList = retPackings;
        return this.manufactureService.getManufactures();
      })

      .then(retManufactures => {
        this.manufactureList = retManufactures;
        return this.productService.getProducts();
      })

      .then(retProducts => this.productList = retProducts);
  }

  add(): void {
    this.create(this.productNew);
  }

  create(product: SeedProduct) {
    this.productService.create(product)
      .then(rep => {
        this.results = rep;
        if(rep.retcode == 0) {
          product.barcode = null;
          product.price = null;
        }
        return this.reload();
      })
}

  restore(barcode: string): void {
    let productTemp: SeedProduct = new SeedProduct();
    for(let i:number=0;i<this.productList.products.length;i++) {
      if(this.productList.products[i].barcode === barcode) {
        productTemp.barcode = this.productList.products[i].barcode;
        productTemp.manufactId = this.productList.products[i].manufactId;
        productTemp.aProductId = this.productList.products[i].aProductId;
        productTemp.packingId = this.productList.products[i].packingId;
        productTemp.price = this.productList.products[i].price;
        productTemp.used = "true";
        break;
      }
    }
    return this.create(productTemp);
  }

  delete(barcode: string): void {
    this.productService.delete(barcode)
      .then(deleteRequestAnswer => {
        this.results = deleteRequestAnswer;
        return this.reload();
      })
  }

  reload():void {
    this.productService.getProducts()
      .then(retPlocations => this.productList = retPlocations);
  }

}
