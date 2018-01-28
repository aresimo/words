import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WordsComponent } from './modules/words/words.component';
import { wordsRoutes } from './modules/words/words-routing.module';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'words',
    pathMatch: 'full',
  },
  {
    path: 'words',
    children: wordsRoutes,
  },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ],
})
export class AppRoutingModule { }
