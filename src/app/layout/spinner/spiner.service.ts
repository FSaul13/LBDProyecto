import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class SpinnerService {

    private blnIsOn$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    _blnIsOn: Observable<boolean> = this.blnIsOn$.asObservable();

    constructor(){}

    fnOnSpinner(){
        this.blnIsOn$.next(true);
    }

    fnOffSpinner(){
        this.blnIsOn$.next(false);
    }
}