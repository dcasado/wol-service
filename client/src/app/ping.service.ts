import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Subject } from 'rxjs/Subject';
import { PingResponse } from './ping-response';

@Injectable()
export class PingService {

  private URL: string = "/ping";

  subResponse: Subject<PingResponse> = new Subject();

  constructor(private http: Http) { }

  ping() {
    return this.http.get(this.URL).map(this.extractData);
  }

  private extractData(res: Response) {
    let body = res.json();
    return new PingResponse(res.status, body.state);
  }

}
