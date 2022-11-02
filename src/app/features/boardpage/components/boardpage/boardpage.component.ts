import { Component, OnInit } from '@angular/core';
import { IBoard } from '../../../../models/board/board';
import { BoardService } from '../../../../services/board/board.service';
import { map, Observable, take } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { ITask } from '../../../../models/board/task';
import { TasksService } from '../../../../services/tasks/tasks.service';

@Component({
  selector: 'app-boardpage',
  templateUrl: './boardpage.component.html',
  styleUrls: ['./boardpage.component.css']
})
export class BoardpageComponent implements OnInit {
  public board: IBoard | null = null;

  public todoTasks: ITask[] = [];
  public progressTasks: ITask[] = [];
  public doneTasks: ITask[] = [];

  public term: string = '';
  public sortType: string = 'ASC';
  public sortField: string = 'date';

  public editingTask: ITask | null = null;
  public showEditModal: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private boardService: BoardService,
    private tasksService: TasksService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    if (history.state.data) {
      this.board = history.state.data;
      this.filterTasks(this.board!.tasks);
    } else {
      this.initializeId()
        .pipe(take(1))
        .subscribe((id) => this.getBoardInfo(id));
    }
  }

  initializeId(): Observable<string> {
    return this.activatedRoute.params
      .pipe(
        map(({ id }) => id),
        take(1)
      );
  }

  getBoardInfo(id: string): void {
    this.boardService
      .getBoard(id)
      .pipe(take(1))
      .subscribe({
        next: (board) => {
          this.board = board;
          this.filterTasks(this.board.tasks);
        },
        error: () => this.board = null
      });
  }

  filterTasks(array: ITask[]): void {
    this.todoTasks = array.filter(t => t.status === 'TODO');
    this.progressTasks = array.filter(t => t.status === 'PROGRESS');
    this.doneTasks = array.filter(t => t.status === 'DONE');
  }

  updateTerm(value: string): void {
    this.term = value;
  }

  updateSortType(value: string): void {
    this.sortType = value;
  }

  updateSortField(value: string): void {
    this.sortField = value;
  }

  setEditingTask(value: ITask): void {
    this.editingTask = value;
    this.toggleModalVisibility(true);
  }

  toggleModalVisibility(value: boolean): void {
    this.showEditModal = value;
  }

  clearEditing(): void {
    this.toggleModalVisibility(false);
    this.editingTask = null;
  }

  deleteBoard(): void {
    if (this.board) {
      this.boardService
        .deleteBoard(this.board!._id)
        .pipe(take(1))
        .subscribe({
          next: () => this.router.navigate(['/dashboard'])
        })
    }
  }

  editTask(
    name: string = this.editingTask!.name,
    id: string = this.editingTask!._id,
    status: string = this.editingTask!.status
  ): void {
    this.tasksService
      .updateTask(id, name, status)
      .pipe(take(1))
      .subscribe({
        next: (task) => {
          this.updateTasks(task);
          this.toggleModalVisibility(false);
          this.editingTask = null;
        },
        error: (err) => console.log(err)
      })
  }

  updateTasks(task: ITask): void {
    switch (this.editingTask!.status) {
      case 'TODO':
        this.todoTasks = this.todoTasks.map(el => el._id === task._id ? task : el);
        break;
      case 'PROGRESS':
        this.progressTasks = this.progressTasks.map(el => el._id === task._id ? task : el);
        break;
      default:
        this.doneTasks = this.doneTasks.map(el => el._id === task._id ? task : el);
    }
  }
}
