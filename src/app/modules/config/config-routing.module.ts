import { Routes } from '@angular/router';

import { ConfigComponent } from './config.component';

export const configRoutes: Routes = [
  {
    path: '',
    component: ConfigComponent,
  },
  {
    path: 'words',
    redirectTo: '',
  },
];
