import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Store, StateObservable } from '@ngrx/store';

import { ConfigComponent } from './config.component';
import { CLEAR_DATA } from './../words/store/words.actions';

describe('ConfigComponent', () => {
  let component: ConfigComponent;
  let fixture: ComponentFixture<ConfigComponent>;

  const mockStore = {
    dispatch: jasmine.createSpy('dispatch'),
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigComponent ],
      providers: [ { provide: Store, useValue: mockStore } ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch CLEAR_DATA action after click on clear button', () => {
    const button = fixture.debugElement.nativeElement.querySelector('button').click();
    expect(mockStore.dispatch).toHaveBeenCalledWith({ type: CLEAR_DATA });
  });
});
