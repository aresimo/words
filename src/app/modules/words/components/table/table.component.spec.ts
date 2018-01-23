import { Observable, BehaviorSubject } from 'rxjs/';
import { async, tick, fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, ViewChild, EventEmitter, Input, Output, OnInit, OnChanges, SimpleChanges, NO_ERRORS_SCHEMA,
   CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TableComponent } from './table.component';
import { By } from '@angular/platform-browser';

const wordsTableInputMock = [
  { id: 2652741, word: 'thickos', translation: 'thickos' },
  { id: 632499, word: 'Transylvanians', translation: 'Transylvanians' },
];

const wordsTableEmptyInputMock = [-1];

const epxectedTranslate = {
  wordId: 2652741,
  word: 'thickos',
};

const expectedEdit = {

};

const expectedDelete = 2652741;

describe('TableComponent', () => {
  let component: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  @Component({
    template: `<app-table
      [wordsTablePaginated]=wordsTable
      (translateAction)='translateAction($event)'
      (deleteAction)='deleteAction($event)'
      (changedAction)='changedAction($event)'>
    </app-table>`,
  })
  class TestHostComponent {
    @ViewChild(TableComponent)
    public tableComponent: TableComponent;

    public translate: any;
    public delete: any;
    public changed: any = 'none';
    public wordsTable: any = new BehaviorSubject(wordsTableInputMock);

    public translateAction(event) {
      this.translate = event;
    }

    public deleteAction(event) {
      this.delete = event;
    }

    public changedAction(event) {
      this.changed = event;
    }
  }

  @Component({
    selector: 'app-edit',
    template: ``,
  })
  class MockEditComponent implements OnChanges {

    @Input() isEdit = false;
    @Input() wordValue = '';
    @Input() wordId = null;
    @Output() changedWordValue: EventEmitter<any> = new EventEmitter();

    public ngOnChanges(changes: SimpleChanges) {
      this.changedWordValue.emit('lorem ipsum');
    }
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestHostComponent, TableComponent, MockEditComponent ],
      schemas: [ NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display table with input data', () => {
    const tableHtml = fixture.debugElement.nativeElement;
    const numberOfRows = fixture.debugElement.queryAll(By.css('.table tr')).length;
    expect(numberOfRows).toBe(3);
  });

  it('should display info when there is no data', () => {
    component.wordsTable.next(wordsTableEmptyInputMock);
    fixture.detectChanges();
    const rows = fixture.debugElement.queryAll(By.css('.table tr'));
    const tableInfo = rows[1].query(By.css('td')).nativeElement.innerText;
    expect(tableInfo).toContain('Table is empty');
  });

  it('should output translate action after translate button click', () => {
    fixture.debugElement.query(By.css('.translate-button')).triggerEventHandler('click', new Event('click'));
    fixture.detectChanges();
    expect(component.translate).toEqual(epxectedTranslate);
  });

  it('should output changed action after edit button click', () => {
    fixture.debugElement.query(By.css('.edit-button')).triggerEventHandler('click', new Event('click'));
    fixture.detectChanges();
    expect(component.changed).toEqual('lorem ipsum');
  });

  it('should output delete action after delete button click', () => {
    component.wordsTable.next(wordsTableInputMock);
    fixture.debugElement.query(By.css('.delete-button')).triggerEventHandler('click', new Event('click'));
    fixture.detectChanges();
    expect(component.delete).toEqual(expectedDelete);
  });
});
