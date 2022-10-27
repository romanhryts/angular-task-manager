import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { IBoard } from '../../../../models/board/board';
import { WindowClickDetectDirective } from '../../../../directives/window-click-detect.directive';


@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  @Input() board!: IBoard
  @Output() deleteBoardEvent = new EventEmitter<string>();
  @Output() openBoardEditorEvent = new EventEmitter<IBoard>();

  isBoardMenu: boolean = false;

  @ViewChild('boardMenu') boardMenu!: ElementRef;

  @ViewChild(WindowClickDetectDirective)
  set boardMenuDirective(directive: WindowClickDetectDirective) {
    directive.boardMenu = this.boardMenu;
  }

  constructor() {
  }

  ngOnInit(): void {
  }

  toggleBoardMenu() {
    this.isBoardMenu = !this.isBoardMenu;
  }

  onDeleteBoard(value: string): void {
    this.deleteBoardEvent.emit(value);
  }

  onOpenBoardEditor(value: IBoard): void {
    this.openBoardEditorEvent.emit(value)
  }

  onWindowClick(): void {
    this.isBoardMenu = false;
  }
}
