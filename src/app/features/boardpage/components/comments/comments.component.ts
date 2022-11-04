import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TasksService } from '../../../../services/tasks/tasks.service';
import { Subscription, take } from 'rxjs';
import { ITask } from '../../../../models/board/task';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit, OnDestroy {
  public comments?: string[];
  private subscription?: Subscription;

  public form = new FormGroup({
    comment: new FormControl('')
  })

  constructor(
    private activatedRoute: ActivatedRoute,
    private tasksService: TasksService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.subscription = this.activatedRoute.params
      .subscribe(() => {
        const { state: { comments } } = history;
        if (!comments || !comments.length) {
          this.comments = undefined;
        } else {
          this.comments = comments as string[];
        }
      })
  }

  ngOnDestroy(): void {
    this.subscription!.unsubscribe();
  }

  addComment(): void {
    const taskId: string = this.getTaskId();
    const comment: string | null = this.form.getRawValue().comment;
    if (comment) {
      this.tasksService
        .addComment(taskId, comment as string)
        .pipe(take(1))
        .subscribe((res) => {
          this.updateTasksSubject(res);
          this.setComments(comment);
        })
    }
  }

  deleteComment(text: string): void {
    this.tasksService
      .deleteComment(this.getTaskId(), text)
      .pipe(take(1))
      .subscribe((res) => {
        this.comments = this.comments!.filter(c => c !== text);
        this.updateTasksSubject(res);
      })
  }

  setComments(comment: string): void {
    if (this.comments === undefined) {
      this.comments = [comment];
      return;
    }
    this.comments = [...this.comments, comment];
  }

  getTaskId(): string {
    const segments: string[] = this.router.url.split('/');
    const taskId: string = segments[segments.length - 1];
    return taskId;
  }

  updateTasksSubject(updatedTask: ITask): void {
    const tasks: ITask[] = this.tasksService.tasksSubject.getValue();
    const updatedTasks: ITask[] = tasks.map(t => t._id === updatedTask._id ? updatedTask : t);
    this.tasksService.tasksSubject.next(updatedTasks);
  }

}
