import { ConfigComponent } from './config/config.component';
import { WordsComponent } from './words/words.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'words',
  },
  {
    path: 'words',
    component: WordsComponent,
  },
  {
    path: 'config',
    component: ConfigComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
