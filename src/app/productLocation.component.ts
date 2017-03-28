import { Component, OnInit } from '@angular/core';

import {Router} from "@angular/router";
import {SeedProductLocation} from "./SeedProductLocation";
import {ProductLocationService} from "./productLocation.service";
import {SeedProductLocationListReply} from "./SeedProductLocationListReply";
import {SeedGenericReply} from "./SeedGenericReply";

@Component({
  moduleId: module.id,
  selector: 'my-productLocation',
  templateUrl: './productLocation.component.html',
  styleUrls: [ './productLocation.component.css' ]
})
export class ProductLocationComponent implements OnInit {
  pLocationsList: SeedProductLocationListReply = new SeedProductLocationListReply();
  pLocationNew: SeedProductLocation = new SeedProductLocation();
  results: SeedGenericReply = new SeedGenericReply();

  constructor(private productLocationService: ProductLocationService, private router: Router) { }

  ngOnInit(): void {
    this.productLocationService.getProductLocations()
      .then(retPlocations => this.pLocationsList = retPlocations);
  }

  add(): void {
    this.create(this.pLocationNew);
  }

  create(plocation: SeedProductLocation) {
    this.productLocationService.create(plocation)
      .then(rep => {
        this.results = rep;
        if(rep.retcode == 0) {
          this.pLocationNew.locationId = null;
          this.pLocationNew.name = null;
        }
        return this.reload();
      })
  }

  restore(id: number): void {
    let ProductLocationTemp: SeedProductLocation = null;
    for(let i:number=0;i<this.pLocationsList.pLocations.length;i++) {
      if(this.pLocationsList.pLocations[i].locationId == id) {
        ProductLocationTemp  = new SeedProductLocation();
        ProductLocationTemp.locationId = this.pLocationsList.pLocations[i].locationId;
        ProductLocationTemp.name = this.pLocationsList.pLocations[i].name;
        ProductLocationTemp.used = "true";
        break;
      }
    }
    if(ProductLocationTemp == null)  return;
    return this.create(ProductLocationTemp);
  }

  delete(id: number): void {
    this.productLocationService.delete(id)
      .then(deleteRequestAnswer => {
        this.results = deleteRequestAnswer;
        return this.reload();
      })
  }

  reload():void {
    this.productLocationService.getProductLocations()
      .then(retPlocations => this.pLocationsList = retPlocations);
  }
}
