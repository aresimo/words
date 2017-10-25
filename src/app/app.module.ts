import { TranslateApiService } from './services/translate-api.service';
import { WordsEffects } from './words/effects/words.effects';
import { WordsApiService } from './services/words-api.service';
import { WordsModule } from './words/words.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule, ActionReducer, ActionReducerMap } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { routerReducer, StoreRouterConnectingModule } from '@ngrx/router-store';
import { localStorageSync } from 'ngrx-store-localstorage';
import { MenuComponent } from './menu/menu.component';
import { HttpModule } from '@angular/http';
import { FooterComponent } from './footer/footer.component';
import { LogoComponent } from './logo/logo.component';
import 'rxjs/add/operator/mapTo';
import { wordsReducer } from './words/reducers/words.reducer';
import { GET_WORD, GET_WORD_SUCCESS } from './words/actions/words.actions';
import { Word } from './words/interfaces/words.interfaces';

export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return localStorageSync({ keys: ['words'], rehydrate: true })(reducer);
}

const metaReducers = [ localStorageSyncReducer ];

export interface AppState {
  words: Word[];
}

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    FooterComponent,
    LogoComponent,
  ],
  imports: [
    BrowserModule,
    EffectsModule.forRoot([WordsEffects]),
    AppRoutingModule,
    HttpModule,
    WordsModule,
    StoreModule.forRoot(
      {
        router: routerReducer,
        words: wordsReducer,
      },
      {
        metaReducers,
      },
    ),
    StoreRouterConnectingModule,
    StoreDevtoolsModule.instrument(),
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
  providers: [ WordsApiService, TranslateApiService ],
  bootstrap: [ AppComponent ],
})
export class AppModule { }
