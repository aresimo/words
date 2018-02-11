import { Routes, RouterModule } from '@angular/router';

import { WordsComponent } from './words.component';

export const wordsRoutes: Routes = [
  {
    path: 'words',
    component: WordsComponent,
  },
];

export const wordsRouter = RouterModule.forChild(wordsRoutes);
