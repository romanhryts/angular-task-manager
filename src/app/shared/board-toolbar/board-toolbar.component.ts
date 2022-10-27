import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-board-toolbar',
  templateUrl: './board-toolbar.component.html',
  styleUrls: ['./board-toolbar.component.css']
})
export class BoardToolbarComponent implements OnInit {
  @Output() inputEvent = new EventEmitter<string>();
  @Output() selectSortTypeEvent = new EventEmitter<string>();
  @Output() selectSortFieldEvent = new EventEmitter<string>();

  @Input() filterPlaceholder: string = 'Search board or tasks inside board';
  @Input() showAdditionalOptions: boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

  onInputEvent(value: string): void {
    this.inputEvent.emit(value);
  }

  onSelectSortTypeEvent(value: string): void {
    this.selectSortTypeEvent.emit(value);
  }

  onSelectSortField(select: HTMLSelectElement) {
    this.selectSortFieldEvent.emit(select.value);
  }
}
