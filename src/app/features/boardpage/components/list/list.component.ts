import { AfterContentInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ITask } from '../../../../models/board/task';
import { TasksService } from '../../../../services/tasks/tasks.service';
import { take } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BoardService } from '../../../../services/board/board.service';

type TasksListType = 'TODO' | 'PROGRESS' | 'DONE';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit, AfterContentInit {
  @Output() takeUpEditingTask = new EventEmitter<ITask>();

  @Input() type!: TasksListType;
  @Input() tasks!: ITask[];
  @Input() boardId!: string;
  @Input() listColor!: string;

  public showAddForm: boolean = false;
  public updatedColor: string = '#000000';

  public form: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.minLength(1)])
  });

  constructor(
    private readonly tasksService: TasksService,
    private readonly boardService: BoardService
  ) {
  }

  ngOnInit(): void {
  }

  ngAfterContentInit(): void {
    this.updatedColor = '#' + this.listColor;
  }

  toggleFormVisibility(value: boolean): void {
    this.showAddForm = value;
  }

  deleteTask(id: string): void {
    this.tasksService
      .deleteTask(id, this.boardId)
      .pipe(take(1))
      .subscribe({
        next: (id) => {
          const updated: ITask[] = this.tasksService.tasksSubject.getValue().filter(t => t._id !== id);
          this.tasksService.tasksSubject.next(updated);
        },
        error: (err) => console.log(err)
      })
  }

  addTask(): void {
    this.tasksService
      .addTask(this.boardId, this.form.getRawValue().name, this.type)
      .pipe(take(1))
      .subscribe({
        next: (t) => {
          const updated: ITask[] =[...this.tasksService.tasksSubject.getValue(), t];
          this.tasksService.tasksSubject.next(updated);
          this.toggleFormVisibility(false);
        },
        error: (err) => console.log(err)
      })
  }

  onDeleteTask(value: string): void {
    this.deleteTask(value);
  }

  onEditTask(value: ITask) {
    this.takeUpEditingTask.emit(value)
  }

  archiveTask(value: ITask): void {
    this.tasksService
      .updateTask(value._id, value.name, 'ARCHIVE')
      .pipe(take(1))
      .subscribe({
        next: (value) => this.tasks = this.tasks.filter(t => t._id !== value._id),
        error: (err) => console.log(err)
      })
  }

  updateColor(): void {
    this.boardService
      .editListColor(this.boardId, this.type, this.updatedColor.slice(1))
      .pipe(take(1))
      .subscribe({
        next: (color) => this.listColor = color,
        error: (err) => console.log(err)
      })
  }

}
