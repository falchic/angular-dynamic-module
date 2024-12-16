import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class SideNavService {

    private sideNavToggleSubject = new Subject<boolean>();

    sideNavToggle$ = this.sideNavToggleSubject.asObservable();

    public toggle() {
        return this.sideNavToggleSubject.next(true);
    }

}