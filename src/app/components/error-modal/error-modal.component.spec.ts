import { Observable } from 'rxjs/Rx';
import { Store } from '@ngrx/store';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalModule, BsModalService } from 'ngx-bootstrap/modal';
import { ErrorModalComponent } from './error-modal.component';
import { Component, ViewChild, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

const mockStoreData = {
  isError: false,
  error: {
    code: 0,
    codeText: '',
    errorMessage: '',
  },
};

const mockStore = {
  select: jasmine.createSpy('select').and.returnValue(Observable.of(mockStoreData)),
  dispatch: jasmine.createSpy('dispatch'),
};

describe('ErrorModalComponent', () => {
  let component: ErrorModalComponent;
  let fixture: ComponentFixture<ErrorModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ErrorModalComponent ],
      imports: [ ModalModule.forRoot() ],
      providers: [ { provide: Store, useValue: mockStore } ],
      schemas: [ NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
