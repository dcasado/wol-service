import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Computer } from './computer';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';

@Injectable()
export class ComputerService {

  private URL: string = "/computers";

  computerSelected: Subject<number> = new Subject();
  computerState: Subject<number> = new Subject();

  computerChange: Subject<boolean> = new Subject();

  constructor(private http: Http) { }

  getAll() {
    return this.http.get(this.URL).map(this.parse);
  }

  private parse(res: Response) {
    let body = res.json();
    let computerList: Computer[] = new Array<Computer>();
    body.map(computer => computerList.push(new Computer(computer.name, computer.ip, computer.mac)));
    return computerList;
  }

  getComputerState(computer: number) {
    return this.http.get(this.URL + '/' + computer).map(res => { let body = res.json(); return body.state });
  }

}
