export class PingResponse {

    status: number;
    state: string;

    constructor(status: number, state: string) {
        this.status = status;
        this.state = state;
    }

}
