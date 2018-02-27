import { HttpClientModule } from '@angular/common/http';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule, ActionReducer, ActionReducerMap } from '@ngrx/store';
import { routerReducer, StoreRouterConnectingModule } from '@ngrx/router-store';
import { localStorageSync } from 'ngrx-store-localstorage';

import { TranslateApiService } from './services/translate-api.service';
import { WordsEffects } from './modules/words/store/words.effects';
import { WordsApiService } from './services/words-api.service';
import { WordsModule } from './modules/words/words.module';
import { ConfigModule } from './modules/config/config.module';
import { appRouter } from './app.router';
import { AppComponent } from './app.component';
import { MenuComponent } from './components/menu/menu.component';
import { FooterComponent } from './components/footer/footer.component';
import { LogoComponent } from './components/logo/logo.component';
import { Word } from './modules/words/store/words.interfaces';
import { WordFilterPipe } from './pipes/word-filter.pipe';
import { NotFoundComponent } from './components/not-found/not-found.component';

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
    WordFilterPipe,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    appRouter,
    HttpClientModule,
    ConfigModule,
    WordsModule,
    EffectsModule.forRoot([]),
    StoreModule.forRoot(
      {
        router: routerReducer,
      },
      {
        metaReducers,
      },
    ),
    StoreRouterConnectingModule,
    StoreDevtoolsModule.instrument(),
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
  providers: [ WordsApiService, TranslateApiService, WordFilterPipe ],
  bootstrap: [ AppComponent ],
})
export class AppModule { }
