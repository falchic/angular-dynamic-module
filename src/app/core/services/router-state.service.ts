import { Injectable } from "@angular/core";
import { ParamMap, Params, UrlSegment } from "@angular/router";
import { Modulo } from "@shared/models/modulo";
import { BehaviorSubject, Observable, Subject } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class RouterStateService {
    params$?: Observable<Params>;
    url$?: Observable<UrlSegment[]>;
    query$?: Observable<ParamMap>;

    private config = new BehaviorSubject<Modulo | null>(null);

    constructor() {
        let storedConfig = sessionStorage.getItem('config');
        if (storedConfig) {
            let confObj = JSON.parse(storedConfig) as Modulo;
            this.setConfig(confObj, false);
        }
    }

    public getConfig() {
        return this.config.asObservable();
    }

    public setConfig(b: Modulo | null, storeConfig: boolean) {
        this.config.next(b);
        if (storeConfig) {
            sessionStorage.setItem('config', JSON.stringify(b));
        }
    }

}