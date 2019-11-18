import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormComponent } from './form/form.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TextInputComponent } from './controls/text-input/text-input.component';
import { ErrorsComponent } from './errors/errors.component';
import { SelectInputComponent } from './controls/select-input/select-input.component';
import { TextareaInputComponent } from './controls/textarea-input/textarea-input.component';
import { TableInputComponent } from './controls/table-input/table-input.component';
import { FilterSearchPipe } from './controls/table-input/table-input.searchPipe';
import { TagInputModule } from 'ngx-chips';

import { TagInputComponent } from './controls/tag-input/tag-input.component'; // this is needed!
import {NgxPaginationModule} from 'ngx-pagination';
import { FileInputComponent } from './controls/file-input/file-input.component';
import { TranslateModule } from '@ngx-translate/core';
import { ColorPickerComponent } from './controls/color-picker/color-picker.component';

import { ColorSketchModule } from 'ngx-color/sketch';
import { ColorAlphaModule } from 'ngx-color/alpha'; // <color-alpha-picker></color-alpha-picker>
import { ColorBlockModule } from 'ngx-color/block'; // <color-block></color-block>
import { ColorChromeModule } from 'ngx-color/chrome'; // <color-chrome></color-chrome>
import { ColorCircleModule } from 'ngx-color/circle'; // <color-circle></color-circle>
import { ColorCompactModule } from 'ngx-color/compact'; // <color-compact></color-compact>
import { ColorGithubModule } from 'ngx-color/github'; // <color-github></color-github>
import { ColorHueModule } from 'ngx-color/hue'; // <color-hue-picker></color-hue-picker>
import { ColorMaterialModule } from 'ngx-color/material'; // <color-material></color-material>
import { ColorPhotoshopModule } from 'ngx-color/photoshop'; // <color-photoshop></color-photoshop>
import { ColorSliderModule } from 'ngx-color/slider'; // <color-slider></color-slider>
import { ColorSwatchesModule } from 'ngx-color/swatches'; // <color-swatches></color-swatches>
import { ColorTwitterModule } from 'ngx-color/twitter'; // <color-twitter></color-twitter>
import { ColorShadeModule } from 'ngx-color/shade'; // <color-shade-picker></color-shade-picker>

@NgModule({
  declarations: [FilterSearchPipe,FormComponent, TextInputComponent, ErrorsComponent, SelectInputComponent, TextareaInputComponent, TableInputComponent, TagInputComponent, FileInputComponent,ColorPickerComponent],
  imports: [
    CommonModule,
    TagInputModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    TranslateModule.forChild(),
    FormsModule,

    ColorSketchModule,
    ColorAlphaModule,
    ColorBlockModule,
    ColorChromeModule,
    ColorCircleModule,
    ColorCompactModule,
    ColorGithubModule,
    ColorHueModule,
    ColorMaterialModule,
    ColorPhotoshopModule,
    ColorSliderModule,
    ColorSwatchesModule,
    ColorTwitterModule,
    ColorShadeModule,
  ],
  exports:[
    FormComponent
  ]
})
export class FormModule { }
