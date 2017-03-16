import { Component, OnInit } from '@angular/core';
import { PingService } from '../ping.service';
import { WakeService } from '../wake.service';
import { WakeResponse } from '../wake-response';
import { PingResponse } from '../ping-response';
import { PingComponent } from '../ping/ping.component';

@Component({
  selector: 'app-ping-list',
  templateUrl: './ping-list.component.html',
  styleUrls: ['./ping-list.component.css']
})
export class PingListComponent implements OnInit {

  private pingList:PingResponse[] = new Array<PingResponse>();

  constructor(
    private pingService: PingService,
    private wakeService: WakeService
    ) { }

  ngOnInit() {
    this.wakeService.subResponse.subscribe(wakeResponse => this.makePing(wakeResponse));
    this.pingService.subResponse.subscribe(res => this.makePingRec(res))
  }

  private makePing(res: WakeResponse) {
    this.pingList.splice(0);
    switch (res.status) {
      case 200:
        this.pingService.ping().subscribe(res => this.pingService.subResponse.next(res));
        break;
      case 400:
        //error
        //console.log(res.message);
        break;
      default:
        //console.log(res.message);
        break;
    }
  }

  private makePingRec(res: PingResponse) {
    if (res.state == '0') {
      if (this.pingList.length < 5) {
        res.state = 'Asleep';
        this.pingService.ping().subscribe(res => this.pingService.subResponse.next(res));
      } else {
        res.state = 'Definetly asleep';
      }
    } else {
      res.state = 'Awake';
    }
    this.pingList.push(res);
  }

}
