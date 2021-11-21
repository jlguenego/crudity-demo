import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutofocusDirective } from './autofocus.directive';
import { SidebarComponent } from './sidebar/sidebar.component';
import { StopPropagationDirective } from './stop-propagation.directive';

@NgModule({
  declarations: [AutofocusDirective, SidebarComponent, StopPropagationDirective],
  imports: [CommonModule, FontAwesomeModule],
  exports: [AutofocusDirective, SidebarComponent, StopPropagationDirective],
})
export class WidgetsModule {}
