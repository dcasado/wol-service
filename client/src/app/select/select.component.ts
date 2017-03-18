import { Component, OnInit } from '@angular/core';
import { ComputerService } from '../computer.service';
import { WakeService } from '../wake.service';

import { Computer } from '../computer';


@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css']
})
export class SelectComponent implements OnInit {

  private computer: number = 0;
  private computerList: Computer[] = new Array<Computer>();


  private stateRequest;
  private wakeRequest;

  constructor(
    private wakeService: WakeService,
    private computerService: ComputerService
  ) { }

  ngOnInit() {
    this.computerService.getAll().subscribe(computers => this.computerList = computers);

    this.stateRequest = this.computerService.getComputerState(this.computer).subscribe(
      state => {
        this.computerService.computerState.next(state)
        this.computerService.computerChange.next(true);
      }
    );
    this.wakeService.wakeRequest.subscribe(
      request => this.wakeRequest = request
    );
  }

  onChange() {
    if (this.stateRequest) {
      this.stateRequest.unsubscribe();
    }
    if (this.wakeRequest) {
      this.wakeRequest.unsubscribe();
    }
    this.stateRequest = this.computerService.getComputerState(this.computer).subscribe(
      state => {
        this.computerService.computerState.next(state)
        this.computerService.computerChange.next(true);
      }
    );

    this.computerService.computerChange.next(false);

    this.computerService.computerSelected.next(this.computer);
  }

}
