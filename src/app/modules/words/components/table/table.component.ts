import { Observable } from 'rxjs/Rx';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: [ './table.component.scss' ],
})
export class TableComponent implements OnInit {

  @Input() wordsTablePaginated: Observable<any>;
  @Output() translateAction: EventEmitter<any> = new EventEmitter();
  @Output() deleteAction: EventEmitter<any> = new EventEmitter();
  @Output() changedAction: EventEmitter<any> = new EventEmitter();

  public isEdit: any = false;

  constructor() {}

  ngOnInit() {}

  public translate(wordIdData: string, wordData: string) {
    const objectToSend = {
      wordId: wordIdData,
      word: wordData,
    };
    this.translateAction.emit(objectToSend);
  }

  public delete(event) {
    this.deleteAction.emit(event);
  }

  public edit(wordId: number): void {
    this.isEdit = wordId;
  }

  public isEdited(wordId: number): boolean {
    return this.isEdit === wordId;
  }

  public changed(event) {
    this.isEdit = null;
    this.changedAction.emit(event);
  }

  public trackByFn(index, item) {
    return item.id;
  }
}
