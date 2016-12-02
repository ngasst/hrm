import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './home.component';
import { TablesComponent } from './table/tables.component';
import { FieldHighlightDirective } from './table/high-field.directive';
import { HomeRoutingModule } from './home-routing.module';

@NgModule({
  imports: [
    SharedModule,
    HomeRoutingModule
  ],
  declarations: [
    HomeComponent,
    TablesComponent,
    FieldHighlightDirective
  ]
})
export class HomeModule { }
