import { Routes, RouterModule } from '@angular/router';

import { ConfigComponent } from './config.component';

export const configRoutes: Routes = [
  {
    path: 'config',
    component: ConfigComponent,
  },
];

export const configRouter = RouterModule.forChild(configRoutes);
