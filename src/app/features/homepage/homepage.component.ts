import { Component, OnInit } from '@angular/core';
import { BoardService } from '../../services/board/board.service';
import { Observable } from 'rxjs';
import { Board } from '../../models/board/board';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  public boards$!: Observable<Board[]>

  constructor(private readonly boardService: BoardService) {
  }

  ngOnInit(): void {
    this.boards$ = this.boardService.getBoards();
  }
}
