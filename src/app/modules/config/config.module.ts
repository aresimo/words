import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ConfigComponent } from './config.component';
import { configRoutes } from './config-routing.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(configRoutes),
  ],
  declarations: [ ConfigComponent ],
})
export class ConfigModule { }
