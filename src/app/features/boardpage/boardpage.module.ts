import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BoardpageRoutingModule } from './boardpage-routing.module';
import { BoardpageComponent } from './components/boardpage/boardpage.component';
import { BoardToolbarModule } from '../../shared/board-toolbar/board-toolbar.module';
import { ListComponent } from './components/list/list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilterTasksPipe } from '../../pipes/boardpage/filter-tasks/filter-tasks.pipe';
import { SortTasksPipe } from '../../pipes/boardpage/sort-tasks/sort-tasks.pipe';
import { TaskComponent } from './components/task/task.component';
import { HomepageModule } from '../homepage/homepage.module';
import { TaskModalComponent } from './components/task-modal/task-modal.component';
import { DragListenerDirective } from '../../directives/drag-listener/drag-listener.directive';
import { DropListenerDirective } from '../../directives/drop-listener/drop-listener.directive';
import { CommentsComponent } from './components/comments/comments.component';

@NgModule({
  declarations: [
    BoardpageComponent,
    ListComponent,
    FilterTasksPipe,
    SortTasksPipe,
    TaskComponent,
    TaskModalComponent,
    DragListenerDirective,
    DropListenerDirective,
    CommentsComponent
  ],
  imports: [
    CommonModule,
    BoardpageRoutingModule,
    BoardToolbarModule,
    ReactiveFormsModule,
    HomepageModule,
    FormsModule
  ]
})
export class BoardpageModule { }

