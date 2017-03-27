import { Component, OnInit } from '@angular/core';

import {Router} from "@angular/router";
import {SeedManufacture} from "./SeedManufacture";
import {ManufactureService} from "./Manufacture.service";
import {SeedManufactureListReply} from "./SeedManufactureListReply";
import {SeedGenericReply} from "./SeedGenericReply";

@Component({
  moduleId: module.id,
  selector: 'my-manufacture',
  templateUrl: './manufacture.component.html',
  styleUrls: [ './manufacture.component.css' ]
})
export class ManufactureComponent implements OnInit {
  manufactureList: SeedManufactureListReply = new SeedManufactureListReply();
  manufactureNew: SeedManufacture = new SeedManufacture();
  results: SeedGenericReply = new SeedGenericReply();

  constructor(private manufactureService: ManufactureService, private router: Router) { }

  ngOnInit(): void {
    this.manufactureService.getManufactures()
      .then(retManufactures => this.manufactureList = retManufactures);
  }

  add(): void {
    this.manufactureService.create(this.manufactureNew)
      .then(rep => {
        this.results = rep;
        this.manufactureNew.manufactureId = null;
        this.manufactureNew.name = null;
        this.manufactureNew.adress = null;
        return this.reload();
      })
  }

  restore(id: number): void {
    this.manufactureNew = this.manufactureList.manufactures[id-1];
    this.manufactureNew.used = "true";
    return this.add();
  }

  delete(id: number): void {
    this.manufactureService.delete(id)
      .then(deleteRequestAnswer => {
        this.results = deleteRequestAnswer;
        return this.reload();
      })
  }

  reload():void {
    this.manufactureService.getManufactures()
      .then(retPlocations => this.manufactureList = retPlocations);
  }
}
