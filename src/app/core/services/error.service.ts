import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class ErrorService {

    private errors = new Subject<ErrorData>();

    public addErrors(error: ErrorData) {
        this.errors.next(error);
    }

    public getErrors() {
        return this.errors.asObservable();
    }

}

export interface ErrorData {
    status: number,
    error?: string,
    message: string
}