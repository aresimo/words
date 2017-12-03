import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit {

  @Output() filterString: EventEmitter<any> = new EventEmitter();

  public filterInput: FormControl;

  constructor() {}

  ngOnInit() {
    this.filterInput = new FormControl('');
  }

  public clearFilter(): void {
    this.filterInput.reset('');
    this.filterString.emit(this.filterInput.value);
  }

  public filterInputHandler() {
    this.filterString.emit(this.filterInput.value);
  }
}
