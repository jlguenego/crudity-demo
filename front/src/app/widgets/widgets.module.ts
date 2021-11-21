import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutofocusDirective } from './autofocus.directive';
import { SidebarComponent } from './sidebar/sidebar.component';



@NgModule({
  declarations: [
    AutofocusDirective,
    SidebarComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    AutofocusDirective,
    SidebarComponent
  ]
})
export class WidgetsModule { }
