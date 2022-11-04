import { Directive, HostListener, Input } from '@angular/core';
import { TasksService } from '../../services/tasks/tasks.service';
import { ITask } from '../../models/board/task';
import { take } from 'rxjs';

@Directive({
  selector: '[appDropListener]'
})
export class DropListenerDirective {
  @Input() listType!: string;

  constructor(
    private tasksService: TasksService
  ) {
  }

  @HostListener('drop')
  onDrop(): void {
    const task: ITask | null = this.tasksService.draggingTask.getValue();
    if (task && task!.status !== this.listType) {
      this.tasksService.updateTask(task._id, task.name, this.listType)
        .pipe(take(1))
        .subscribe((value) => {
          const tasks: ITask[] = this.tasksService.tasksSubject.getValue();
          const updatedTasks: ITask[] = tasks.map(t => t._id === value._id ? value : t);
          this.tasksService.tasksSubject.next(updatedTasks);
        })
    }
  }

}
