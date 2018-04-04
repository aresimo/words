import { CLEAR_ERROR } from './../../store/error.actions';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit, TemplateRef, ViewChild, ViewEncapsulation, OnDestroy } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';

import { AppState } from './../../interfaces/appState.interface';

@Component({
  selector: 'app-error-modal',
  templateUrl: './error-modal.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./error-modal.component.scss'],
})
export class ErrorModalComponent implements OnInit, OnDestroy {

  public modalRef: BsModalRef;
  @ViewChild('template')
  public templateRef: TemplateRef<any>;
  public isError: Subscription;
  public errorData$: Observable<any>;

  constructor(private modalService: BsModalService, private store: Store<AppState>) { }

  ngOnInit() {
    this.isErrorInit();
    this.errorDataInit();
  }

  private errorDataInit() {
    this.errorData$ = this.store.select('error').map(state => state.error);
  }

  private isErrorInit(): void {
    this.isError = this.store.select('error').map(state => state.isError).subscribe((errorState: boolean) => {
      if (errorState) { this.openModal(this.templateRef); }
    });
  }

  public openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  public closeModal() {
    this.modalRef.hide();
    this.store.dispatch({ type: CLEAR_ERROR });
  }

  public ngOnDestroy() {
    this.isError.unsubscribe();
  }
}
