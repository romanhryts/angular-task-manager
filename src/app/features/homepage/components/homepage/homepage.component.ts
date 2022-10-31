import { Component, OnInit } from '@angular/core';
import { BoardService } from '../../../../services/board/board.service';
import { take } from 'rxjs';
import { IBoard } from '../../../../models/board/board';
import { IAddBoard } from '../../../../models/board/add-board';
import { AuthService } from '../../../../services/auth/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  public boards: IBoard[] = [];
  public showAddBoardModal: boolean = false;
  public showEditBoardModal: boolean = false;
  public editingBoard: IBoard | null = null;
  public filterTerm: string = '';
  public sortType: string = 'ASC';
  public sortField: string = 'date';

  public boardToolbarStyles = {
    'margin': '4rem auto 0',
    'display': 'flex',
    'justify-content': 'center',
    'width': '65%',
    'filter': ''
  }

  constructor(
    private readonly boardService: BoardService,
    private readonly authService: AuthService,
    private readonly activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.activatedRoute.data
      .pipe(take(1))
      .subscribe({
        next: ({data}) => this.boards = data,
        error: () => this.boards = []
      })
  }

  addBoard(data: IAddBoard): void {
    const user_id: string = this.authService.userState.getValue()!.id;
    this.boardService.addBoard({ ...data, user_id })
      .pipe(take(1))
      .subscribe({
        next: (value) => {
          this.boards = [value, ...this.boards];
          this.toggleAddBoardModal();
        },
        error: (err) => console.log(err)
      })
  }

  deleteBoard(id: string): void {
    this.boardService.deleteBoard(id)
      .pipe(take(1))
      .subscribe({
        next: (value) => this.boards = this.boards.filter(b => b._id !== value),
        error: (err) => console.log(err)
      })
  }

  editBoard(data: IAddBoard): void {
    const body = { ...data, id: this.editingBoard!._id };
    this.boardService.editBoard(body)
      .pipe(take(1))
      .subscribe({
        next: (value) => {
          this.boards = this.boards.map(b => b._id === value._id ? value : b)
          this.toggleEditBoardModal()
        },
        error: (err) => console.log(err)
      })
  }

  toggleAddBoardModal(): void {
    this.showAddBoardModal = !this.showAddBoardModal;
    if (this.showAddBoardModal) {
      this.boardToolbarStyles.filter = 'blur(5px)';
    } else {
      this.boardToolbarStyles.filter = '';
    }
  }

  toggleEditBoardModal(): void {
    this.showEditBoardModal = !this.showEditBoardModal;
    if (this.showEditBoardModal) {
      this.boardToolbarStyles.filter = 'blur(5px)';
    } else {
      this.boardToolbarStyles.filter = '';
    }
  }

  setEditingBoard(value: IBoard): void {
    this.editingBoard = value;
    this.toggleEditBoardModal();
  }

  updateFilterTerm(value: string): void {
    console.log(value);
    this.filterTerm = value;
  }

  changeSortType(value: string) {
    this.sortType = value;
  }

  changeSortField(value: string) {
    this.sortField = value;
  }
}
