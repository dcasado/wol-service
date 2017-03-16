import { Component, OnInit } from '@angular/core';
import { ComputerService } from '../computer.service';
import { WakeService } from '../wake.service';

import { Computer } from '../computer';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  private computer: number = 0;
  private password: string = '';

  private computerList: Computer[] = new Array<Computer>();

  private computerState: number = 0;

  private stateTitle: string = 'Waiting for response';

  private stateRequest;
  private wakeRequest;

  constructor(
    private computerService: ComputerService,
    private wakeService: WakeService
  ) { }

  ngOnInit() {
    this.computerService.getAll().subscribe(computers => this.computerList = computers);

    this.computerService.computerState.subscribe(state => this.updateState(state));

    this.stateRequest = this.computerService.getComputerState(this.computer).subscribe(state => this.computerService.computerState.next(state));
  }

  onSubmit() {
    this.stateTitle = 'Waking... this could last a couple of minutes';
    this.wakeRequest = this.wakeService.wake(this.computer, this.password).subscribe(serverResponse => {
      if (serverResponse.status == 200) {
        this.computerService.computerState.next(serverResponse.body.state);
      } else if (serverResponse.status == 403) {
        console.log(serverResponse.body.message);
      }
    });
    this.clearForm();
  }

  clearForm() {
    this.password = null;
  }

  onChange() {
    if (this.stateRequest) {
      this.stateRequest.unsubscribe();
    }
    if (this.wakeRequest){
      this.wakeRequest.unsubscribe();
    }
    this.stateTitle = 'Waiting for response';
    this.stateRequest = this.computerService.getComputerState(this.computer).subscribe(state => this.computerService.computerState.next(state));
  }

  updateState(state: number) {
    this.computerState = state;
    if (state == 1) {
      this.stateTitle = "Device is awake";
    } else {
      this.stateTitle = "Device is asleep";
    }
  }

}
