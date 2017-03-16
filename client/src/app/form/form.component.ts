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

  constructor(
    private computerService: ComputerService,
    private wakeService: WakeService
  ) { }

  ngOnInit() {
    this.computerService.getAll().subscribe(computers => this.computerList = computers);
  }

  onSubmit() {
    this.wakeService.wake(this.computer, this.password).subscribe(wakeResponse => this.wakeService.subResponse.next(wakeResponse));
    this.clearForm();
  }

  clearForm() {
    this.password = null;
  }


}
