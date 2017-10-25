import { Component, OnInit, Input, Output, EventEmitter, ViewChild, OnChanges } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-display-edit',
  templateUrl: './display-edit.component.html',
  styleUrls: ['./display-edit.component.scss'],
})
export class DisplayEditComponent implements OnInit, OnChanges {

  @Input() wordValue = '';
  @Input() wordId = null;
  @Input() isEdit = false;
  @Output() changedWordValue: EventEmitter<any> = new EventEmitter<any>(true);
  @ViewChild('word') wordInputElement: any;

  public wordInput: FormControl;

  constructor() { }

  public ngOnInit() {
    this.wordInput = new FormControl(this.wordValue);
  }

  public ngOnChanges(changes) {
    if (changes.isEdit.currentValue) {
      setTimeout(() => this.wordInputElement.nativeElement.focus(), 250);
    } else {
      this.isEdit = false;
    }
  }

  public saveWord(): void {
    const objectToSend = { id: this.wordId, word: this.wordInput.value };
    this.changedWordValue.emit(objectToSend);
  }

  public saveOnEnter(event): void {
    if (event.keyCode === 13) {
      this.saveWord();
    }
  }

  public clearField(event) {
    this.wordInput.reset('');
    this.wordInputElement.nativeElement.focus();
  }
}
