import {
  Component,
  OnInit,
  OnChanges,
  OnDestroy,
  ChangeDetectionStrategy,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Rx';
import { of } from 'rxjs/observable/of';
import { switchMap } from 'rxjs/operators/switchMap';
import { map } from 'rxjs/operators/map';
import { filter } from 'rxjs/operators/filter';
import { pluck } from 'rxjs/operators/pluck';
import { debounceTime } from 'rxjs/operators/debounceTime';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';

import { WordFilterPipe } from './../../pipes/word-filter.pipe';
import {
  GET_WORD,
  DELETE_WORD,
  EDIT_WORD,
  TRANSLATE_WORD,
} from './store/words.actions';
import { AppState } from './../../interfaces/appState.interface';
import { WordTablePaginated } from './interfaces/wordTablePaginated.interface';
import { WordTableRow } from './interfaces/wordTableRow.interface';
import { PageChangedEvent } from 'ngx-bootstrap/pagination/pagination.component';

@Component({
  selector: 'app-words',
  templateUrl: './words.component.html',
  styleUrls: ['./words.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WordsComponent implements OnInit, OnDestroy {
  public wordsTablePaginated$: Observable<WordTableRow[]>;
  public currentPage = 1;
  public collectionSize: number;
  public pageSize = 10;
  public searchInput = '';
  public totalItems = 0;

  private searchObs$: Subject<string>;
  private paginationObs$: Subject<number>;
  private wordsTable$: Observable<WordTablePaginated>;
  private subscription: Subscription;

  constructor(
    private store: Store<AppState>,
    private wordFilter: WordFilterPipe,
  ) {}

  public ngOnInit() {
    this.paginationObs$ = new BehaviorSubject(1);
    this.searchObs$ = new BehaviorSubject('');
    this.wordsTable$ = this.initWordTable;
    this.wordsTablePaginated$ = this.initWordPaginateTable;
    this.setTotalItems();
  }

  public ngOnDestroy () {
    this.subscription.unsubscribe();
  }

  public changeCurrentPage(page: PageChangedEvent) {
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

  private get initWordPaginateTable(): Observable<WordTableRow[]> {
    return this.paginationObs$.pipe(
      switchMap(item => this.wordsTable$),
      filter(Boolean),
      map((table: WordTableRow[]) => {
        return table.slice(
          (this.currentPage - 1) * this.pageSize,
          this.currentPage * this.pageSize,
        );
      }),
    );
  }

  private get initWordTable(): Observable<any> {
    return this.store
      .select('words')
      .pipe(
        pluck('model'),
        switchMap(value =>
          this.searchObs$.pipe(
            debounceTime(500),
            map((item: string) =>
              this.wordFilter.transform(value, 'word', item),
            ),
          ),
        ),
      );
  }

  private setTotalItems(): void {
    this.subscription = this.wordsTable$
      .pipe(
        map((item: any) => item.length),
      )
      .subscribe(numberOfItems => this.totalItems = numberOfItems);
  }
}
