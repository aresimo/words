import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core/src/metadata/ng_module';

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
];

export const appRouter: ModuleWithProviders = RouterModule.forRoot(routes);
