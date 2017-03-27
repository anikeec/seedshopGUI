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
    this.productLocationService.create(this.pLocationNew)
      .then(rep => {
        this.results = rep;
        this.pLocationNew.locationId = null;
        this.pLocationNew.name = null;
        return this.reload();
      })
  }

  restore(id: number): void {
    this.pLocationNew = this.pLocationsList.pLocations[id-1];
    this.pLocationNew.used = "true";
    return this.add();
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
