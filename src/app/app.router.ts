import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core/src/metadata/ng_module';

import { NotFoundComponent } from './components/not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'words',
    pathMatch: 'full',
  },
  {
    path: 'words',
    loadChildren: 'app/modules/words/words.module#WordsModule',
  },
  {
    path: 'config',
    loadChildren: 'app/modules/config/config.module#ConfigModule',
  },
  {
    path: '404',
    component: NotFoundComponent,
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: '404',
  },
];

export const appRouter: ModuleWithProviders = RouterModule.forRoot(routes);
