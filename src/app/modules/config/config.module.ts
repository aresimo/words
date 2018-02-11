import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfigComponent } from './config.component';
import { configRouter } from './config.router';

@NgModule({
  imports: [
    configRouter,
    CommonModule,
  ],
  declarations: [ ConfigComponent ],
})
export class ConfigModule { }
