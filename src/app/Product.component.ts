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
    this.productService.create(this.productNew)
      .then(rep => {
        this.results = rep;
        this.productNew.barcode = null;
        this.productNew.price = null;
        return this.reload();
      })
  }

  restore(barcode: string): void {
    //this.productNew = this.productList.products[id-1];
    //this.productNew.used = "true";
    return this.add();
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
