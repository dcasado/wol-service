import { Component, OnInit } from '@angular/core';
import { ComputerService } from '../computer.service';
import { WakeService } from '../wake.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  private computer: number = 0;
  private password: string = '';

  private computerChange: boolean = false;

  private stateTitle: string = 'Waiting for response';

  constructor(
    private computerService: ComputerService,
    private wakeService: WakeService
  ) { }

  ngOnInit() {
    this.computerService.computerSelected.subscribe(selected => this.computer = selected);
    this.computerService.computerState.subscribe(state => this.updateState(state));

    this.computerService.computerChange.subscribe(change => this.computerChange = change);
  }

  onSubmit() {
    this.stateTitle = 'Waking... this could last a couple of minutes';
    let wakeRequest = this.wakeService.wake(this.computer, this.password).subscribe(
      serverResponse => {
        if (!serverResponse.body.message) {
          this.computerService.computerState.next(serverResponse.body.state);
        } else {
          this.stateTitle = serverResponse.body.message;
        }
      }
    );
    this.wakeService.wakeRequest.next(wakeRequest);
    this.clearForm();
  }

  clearForm() {
    this.password = null;
  }

  updateState(state: number) {
    if (state == 1) {
      this.stateTitle = "Device is awake";
    } else {
      this.stateTitle = "Device is asleep";
    }
  }

}
