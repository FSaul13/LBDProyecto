import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CollapseTableComponent } from './sithec-tools-suite.component';
import { TableComponent } from './controls/collapse-table/collapse-table.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ColumnTextSearchPipe } from './filters/filter-column-text.pipe';
import { QuizGeneratorComponent } from './controls/quiz-generator/quiz-generator.component';
import { OpenQuestionComponent } from './controls/quiz-generator/question/open-question/open-question.component';
import { OptionsQuestionComponent } from './controls/quiz-generator/question/options-question/options-question.component';
import { HeaderQuestionComponent } from './controls/quiz-generator/question/header-question/header-question.component';
import { OptionsMultipleQuestionComponent } from './controls/quiz-generator/question/options-multiple-question/options-multiple-question.component';
import { QueryQuestionComponent } from './controls/quiz-generator/question/query-question/query-question.component';
import {HttpClientModule} from '@angular/common/http';
import { DndModule } from 'ngx-drag-drop';
import { SelectQuestionComponent } from './controls/quiz-generator/question/select-question/select-question.component';
import { RankQuestionComponent } from './controls/quiz-generator/question/rank-question/rank-question.component';
import { RaitingQuestionComponent } from './controls/quiz-generator/question/raiting-question/raiting-question.component';
import { InputComponent } from './controls/form-generator/form-fields/input/input.component';
import { FormGeneratorComponent } from './controls/form-generator/form-generator.component';
import { GroupComponent } from './controls/form-generator/form-fields/group/group.component';
import { SelectComponent } from './controls/form-generator/form-fields/select/select.component';


@NgModule({
  declarations: [
    CollapseTableComponent,
    TableComponent,
    ColumnTextSearchPipe,
    QuizGeneratorComponent,
    OpenQuestionComponent,
    OptionsQuestionComponent,
    HeaderQuestionComponent,
    OptionsMultipleQuestionComponent,
    QueryQuestionComponent,
    SelectQuestionComponent,
    RankQuestionComponent,
    RaitingQuestionComponent,
    InputComponent,
    FormGeneratorComponent,
    GroupComponent,
    SelectComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DndModule,
    HttpClientModule
  ],
  exports: [
    CollapseTableComponent,
    QuizGeneratorComponent
  ]
})
export class SithecSuiteModule { }
