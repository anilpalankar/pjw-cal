import { Injectable } from '@angular/core';
import { Subject, of, Observable, BehaviorSubject } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Injectable({
    providedIn: 'root'
})
export class AppCommonService {
    constructor() {}  
  
    private readonly rsrDialogDataToEmit$ = new BehaviorSubject<any>(null);
    getDialogData$ = this.rsrDialogDataToEmit$.asObservable();   

    setDialogData(rsr: any): void {
        this.rsrDialogDataToEmit$.next(rsr);
    }  
}
