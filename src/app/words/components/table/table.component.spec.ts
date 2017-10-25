import { TranslateApiService } from './../../../services/translate-api.service';
import { HttpModule } from '@angular/http';
import { WordsApiService } from './../../../services/words-api.service';
import { WordFilterPipe } from './../../../pipes/word-filter.pipe';
import { Observable } from 'rxjs/';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { TableComponent } from './table.component';
import { Store } from '@ngrx/store';
import { ReactiveFormsModule } from '@angular/forms';

const mockStore = {
  select: () => Observable.of({ model: [ { word: 'lorem ipsum dolor sit amet' } ] }),
};

const mockTranslateService = {
  dispatch: () => {},
  select: () => Observable.of([]),
};

describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ HttpModule ],
      declarations: [ TableComponent ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
      providers: [ WordsApiService, { provide: Store, useValue: mockStore }, WordFilterPipe ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
