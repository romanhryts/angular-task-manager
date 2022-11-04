import { Directive, ElementRef, HostListener, Input, OnInit } from '@angular/core';
import { ITask } from '../../models/board/task';
import { TasksService } from '../../services/tasks/tasks.service';

@Directive({
  selector: '[appDragListener]'
})
export class DragListenerDirective implements OnInit {
  @Input() task!: ITask;

  constructor(
    private ref: ElementRef,
    private tasksService: TasksService
  ) {
  }

  ngOnInit(): void {
    this.ref.nativeElement.draggable = true;
  }

  @HostListener('dragstart')
  onDragStart(): void {
    this.ref.nativeElement.classList.add('dragging');
    this.tasksService.draggingTask.next(this.task);
  }

  @HostListener('dragend')
  onDragEnd(): void {
    this.ref.nativeElement.classList.remove('dragging');
  }

}
