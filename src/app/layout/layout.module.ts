import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import {HeaderComponent} from './header/header.component'
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    LayoutComponent,
    SidebarComponent,
    HeaderComponent
  ],
  imports: [
    SharedModule
    // CommonModule
  ],
  exports: [
      LayoutComponent,
      SidebarComponent,
      HeaderComponent
  ]
})
export class LayoutModule { }
