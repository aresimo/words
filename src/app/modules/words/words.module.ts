import { RouterModule } from '@angular/router';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PaginationModule } from 'ngx-bootstrap/pagination';

import { WordsComponent } from './words.component';
import { EditComponent } from './components/edit/edit.component';
import { TableComponent } from './components/table/table.component';
import { FilterComponent } from './components/filter/filter.component';
import { wordsRouter } from './words.router';

@NgModule({
  imports: [
    CommonModule,
    PaginationModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    wordsRouter,
  ],
  declarations: [ WordsComponent, EditComponent, FilterComponent, TableComponent ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
})
export class WordsModule { }
