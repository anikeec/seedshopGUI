import { Component, OnInit } from '@angular/core';

import {Router} from "@angular/router";
import {SeedDeliveryStatus} from "./SeedDeliveryStatus";
import {DeliveryStatusService} from "./DeliveryStatus.service";
import {SeedDeliveryStatusListReply} from "./SeedDeliveryStatusListReply";
import {SeedGenericReply} from "./SeedGenericReply";

@Component({
  moduleId: module.id,
  selector: 'my-deliveryStatus',
  templateUrl: './deliveryStatus.component.html',
  styleUrls: [ './deliveryStatus.component.css' ]
})
export class DeliveryStatusComponent implements OnInit {
  deliveryStatusList: SeedDeliveryStatusListReply = new SeedDeliveryStatusListReply();
  deliveryStatusNew: SeedDeliveryStatus = new SeedDeliveryStatus();
  results: SeedGenericReply = new SeedGenericReply();

  constructor(private deliveryStatusService: DeliveryStatusService, private router: Router) { }

  ngOnInit(): void {
    this.deliveryStatusService.getDeliveryStatuses()
      .then(retDeliveryStatuses => this.deliveryStatusList = retDeliveryStatuses);
  }

  add(): void {
    this.create(this.deliveryStatusNew);
  }

  create(dstatus: SeedDeliveryStatus) {
    this.deliveryStatusService.create(dstatus)
      .then(rep => {
        this.results = rep;
        if(rep.retcode == 0) {
          dstatus.statusId = null;
          dstatus.name = null;
        }
        return this.reload();
      })
  }

  restore(id: number): void {
    let deliveryStatusTemp: SeedDeliveryStatus = null;
    for(let i:number=0;i<this.deliveryStatusList.deliveryStatuses.length;i++) {
      if(this.deliveryStatusList.deliveryStatuses[i].statusId == id) {
        deliveryStatusTemp  = new SeedDeliveryStatus();
        deliveryStatusTemp.statusId = this.deliveryStatusList.deliveryStatuses[i].statusId;
        deliveryStatusTemp.name = this.deliveryStatusList.deliveryStatuses[i].name;
        deliveryStatusTemp.used = "true";
        break;
      }
    }
    if(deliveryStatusTemp == null)  return;
    return this.create(deliveryStatusTemp);
  }

  delete(id: number): void {
    this.deliveryStatusService.delete(id)
      .then(deleteRequestAnswer => {
        this.results = deleteRequestAnswer;
        return this.reload();
      })
  }

  reload():void {
    this.deliveryStatusService.getDeliveryStatuses()
      .then(retDeliveryStatuses => this.deliveryStatusList = retDeliveryStatuses);
  }
}
