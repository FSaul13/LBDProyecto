import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FulfillingSquareSpinnerModule,SemipolarSpinnerModule,ScalingSquaresSpinnerModule, SelfBuildingSquareSpinnerModule   } from 'angular-epic-spinners'//npm i angular-epic-spinners
import { SpinnerComponent } from './spinner.component';
import { SpinnerService } from './spiner.service';


@NgModule({
    imports: [
        CommonModule,
        FulfillingSquareSpinnerModule ,
        SemipolarSpinnerModule,
        ScalingSquaresSpinnerModule,
        SelfBuildingSquareSpinnerModule
    ],
    declarations: [
        SpinnerComponent
    ],
    providers: [
        SpinnerService
    ],
    exports: [
        SpinnerComponent
    ]
})
export class SpinnerModule { }