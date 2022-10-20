import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IBoard } from '../../../../models/board/board';


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
}
