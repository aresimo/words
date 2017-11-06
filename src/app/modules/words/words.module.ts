import { WordFilterPipe } from './../../pipes/word-filter.pipe';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WordsComponent } from './words.component';
import { DisplayEditComponent } from './components/display-edit/display-edit.component';
import { DisplayTableComponent } from './components/display-table/display-table.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchComponent } from './components/search/search.component';
import { PaginationModule } from 'ngx-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    PaginationModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [ WordsComponent, DisplayEditComponent, SearchComponent, DisplayTableComponent ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
  providers: [ WordFilterPipe ],
})
export class WordsModule { }
