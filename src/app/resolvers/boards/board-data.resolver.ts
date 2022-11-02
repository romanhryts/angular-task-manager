import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import { BoardService } from '../../services/board/board.service';
import { IBoard } from '../../models/board/board';

@Injectable({
  providedIn: 'root'
})
export class BoardDataResolver implements Resolve<IBoard[]> {

  constructor(private boardService: BoardService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IBoard[]> {
    return this.boardService.getBoards();
  }
}
