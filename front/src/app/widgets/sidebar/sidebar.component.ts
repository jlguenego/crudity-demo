import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  faTimes = faTimes;
  @Input() show = false;
  @Output() showChange = new EventEmitter<boolean>();

  constructor() {}

  ngOnInit(): void {}

  hide() {
    this.showChange.emit(false);
  }
}
