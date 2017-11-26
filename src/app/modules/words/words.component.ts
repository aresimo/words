import { Component, OnInit, OnChanges } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Rx';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';

import { WordFilterPipe } from './../../pipes/word-filter.pipe';
import { GET_WORD, DELETE_WORD, EDIT_WORD, TRANSLATE_WORD } from './store/words.actions';
import { AppState } from './../../app.module';

@Component({
  selector: 'app-words',
  templateUrl: './words.component.html',
  styleUrls: ['./words.component.scss'],
})
export class WordsComponent implements OnInit {

  public wordsTable$: any;
  public wordsTablePaginated$: any;
  public currentPage = 1;
  public collectionSize: number;
  public pageSize = 10;
  public searchInput = '';
  private searchObs$: any;
  private paginationObs$: any;
  public totalItems = 0;

  constructor(private store: Store<AppState>, private wordFilter: WordFilterPipe) {}

  public ngOnInit() {
    this.paginationObs$ = new BehaviorSubject(1);
    this.searchObs$ = new BehaviorSubject('');
    this.wordsTable$ = this.initWordTable;
    this.wordsTablePaginated$ = this.initWordPaginateTable;
    this.setTotalItems();
  }

  public changeCurrentPage(page) {
    this.currentPage = page.page;
    this.paginationObs$.next();
  }

  public deleteWord(wordId: number): void {
    this.store.dispatch({ type: DELETE_WORD, payload: wordId });
  }

  public addWord(): void {
    this.store.dispatch({ type: GET_WORD });
  }

  public translate(event: any): void {
    const wordToTranslate = { wordId: event.wordId, word: event.word };
    this.store.dispatch({ type: TRANSLATE_WORD, payload: wordToTranslate });
  }

  public searchStringChanged(searchString: string): void {
    this.searchObs$.next(searchString);
    this.searchInput = searchString;
  }

  public wordChanged(word: any): void {
    word.word === ''
      ? this.store.dispatch({ type: DELETE_WORD, payload: word.id })
      : this.store.dispatch({ type: EDIT_WORD, payload: word });
  }

  private get initWordPaginateTable(): Observable<any> {
    return this.paginationObs$
      .switchMap(item => this.wordsTable$)
      .filter(Boolean)
      .map(table => table.slice(
        (this.currentPage - 1) * this.pageSize,
        (this.currentPage) * this.pageSize));
  }

  private get initWordTable(): Observable<any> {
    return this.store.select('words')
      .pluck('model')
      .switchMap(value => this.searchObs$
        .debounceTime(500)
        .map(item => this.wordFilter.transform(value, 'word', item),
      ));
  }

  private setTotalItems(): void {
    this.wordsTable$
      .map(item => item.length)
      .subscribe(numberOfItems => this.totalItems = numberOfItems);
  }
}
