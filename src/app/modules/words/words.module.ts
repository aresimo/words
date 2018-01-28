import { RouterModule } from '@angular/router';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PaginationModule } from 'ngx-bootstrap';

import { WordFilterPipe } from './../../pipes/word-filter.pipe';
import { WordsComponent } from './words.component';
import { EditComponent } from './components/edit/edit.component';
import { TableComponent } from './components/table/table.component';
import { FilterComponent } from './components/filter/filter.component';
import { AppRoutingModule } from './../../app-routing.module';
import { wordsRoutes } from './words-routing.module';

@NgModule({
  imports: [
    CommonModule,
    PaginationModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(wordsRoutes),
    AppRoutingModule,
  ],
  declarations: [ WordsComponent, EditComponent, FilterComponent, TableComponent ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
  providers: [ WordFilterPipe ],
})
export class WordsModule { }
