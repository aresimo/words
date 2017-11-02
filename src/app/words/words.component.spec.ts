import { Observable } from 'rxjs/';
import { async, fakeAsync, ComponentFixture, TestBed, tick, discardPeriodicTasks } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { Store } from '@ngrx/store';
import { ReactiveFormsModule } from '@angular/forms';

import { WordsComponent } from './words.component';
import { TranslateApiService } from './../services/translate-api.service';
import { WordsApiService } from './../services/words-api.service';
import { WordFilterPipe } from './../pipes/word-filter.pipe';

const mockStore = {
  select: () => Observable.of({ model: [ { word: 'lorem ipsum dolor sit amet' } ] }),
};

const mockWordsApiService = {
  word: () => Observable.of([{}]),
};

describe('WordsComponent', () => {
  let component: WordsComponent;
  let fixture: ComponentFixture<WordsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WordsComponent ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
      providers: [
        { provide: WordsApiService, useValue: mockWordsApiService },
        { provide: Store, useValue: mockStore },
        WordFilterPipe,
      ],
    })
    .compileComponents();
    fixture = TestBed.createComponent(WordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should be created', async((): void => {
    expect(component).toBeTruthy();
  }));
});
