import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { AppState } from './../../app.module';
import { CLEAR_DATA } from './../words/store/words.actions';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.scss'],
})
export class ConfigComponent implements OnInit {

  constructor(private store: Store<AppState>) { }

  ngOnInit() {}

  public clearData() {
    this.store.dispatch({ type: CLEAR_DATA });
  }
}
