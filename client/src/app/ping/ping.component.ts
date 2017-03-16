import { Component, OnInit, Input } from '@angular/core';
import { Response } from '@angular/http';

@Component({
  selector: 'app-ping',
  templateUrl: './ping.component.html',
  styleUrls: ['./ping.component.css']
})
export class PingComponent implements OnInit {

  @Input()
  private computerState:string;

  constructor() { }

  ngOnInit() {
  }


}
