import { HttpModule } from '@angular/http';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule, ActionReducer, ActionReducerMap } from '@ngrx/store';
import { routerReducer, StoreRouterConnectingModule } from '@ngrx/router-store';
import 'rxjs/add/operator/mapTo';
import { localStorageSync } from 'ngrx-store-localstorage';

import { TranslateApiService } from './services/translate-api.service';
import { WordsEffects } from './words/effects/words.effects';
import { WordsApiService } from './services/words-api.service';
import { WordsModule } from './words/words.module';
import { ConfigModule } from './config/config.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './components/menu/menu.component';
import { FooterComponent } from './components/footer/footer.component';
import { LogoComponent } from './components/logo/logo.component';
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
    ConfigModule,
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
