import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ITask } from '../../../../models/board/task';
import { WindowClickDetectDirective } from '../../../../directives/window-click-detect/window-click-detect.directive';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  @Output() deleteTaskEvent = new EventEmitter<string>();
  @Output() editTaskEvent = new EventEmitter<ITask>();
  @Output() archiveTaskEvent = new EventEmitter<ITask>();

  @Input() task!: ITask;

  public showContextMenu: boolean = false;

  @ViewChild('taskMenu') taskMenu!: ElementRef;

  @ViewChild(WindowClickDetectDirective)
  set taskMenuDirective(directive: WindowClickDetectDirective) {
    directive.taskMenu = this.taskMenu;
  }

  constructor() { }

  ngOnInit(): void {
  }

  toggleContextMenu(): void {
    this.showContextMenu = !this.showContextMenu;
  }

  onWindowClick(): void {
    this.showContextMenu = false;
  }

  onDeleteTask(id: string): void {
    this.deleteTaskEvent.emit(id);
  }

  onEditTask(): void {
    this.editTaskEvent.emit(this.task);
  }

  onArchiveTask(): void {
    this.archiveTaskEvent.emit(this.task);
  }

}
