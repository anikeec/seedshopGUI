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
    this.create(this.manufactureNew);
  }

  create(manufacture: SeedManufacture) {
    this.manufactureService.create(manufacture)
      .then(rep => {
        this.results = rep;
        if(rep.retcode == 0) {
          this.manufactureNew.manufactureId = null;
          this.manufactureNew.name = null;
          this.manufactureNew.adress = null;
        }
        return this.reload();
      })
  }

  restore(id: number): void {
    let manufactureTemp: SeedManufacture = null;
    for(let i:number=0;i<this.manufactureList.manufactures.length;i++) {
      if(this.manufactureList.manufactures[i].manufactureId == id) {
        manufactureTemp  = new SeedManufacture();
        manufactureTemp.manufactureId = this.manufactureList.manufactures[i].manufactureId;
        manufactureTemp.name = this.manufactureList.manufactures[i].name;
        manufactureTemp.adress = this.manufactureList.manufactures[i].adress;
        manufactureTemp.used = "true";
        break;
      }
    }
    if(manufactureTemp == null)  return;
    return this.create(manufactureTemp);
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
