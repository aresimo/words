import { ConfigComponent } from './words/components/config/config.component';
import { TableComponent } from './words/components/table/table.component';
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
    component: TableComponent,
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
