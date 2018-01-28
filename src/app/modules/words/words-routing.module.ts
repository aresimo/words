import { Routes } from '@angular/router';

import { WordsComponent } from './words.component';
import { configRoutes } from '../config/config-routing.module';

export const wordsRoutes: Routes = [
  {
    path: '',
    component: WordsComponent,
  },
  {
    path: 'config',
    children: configRoutes,
  },
];
