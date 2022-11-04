import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoardpageComponent } from './components/boardpage/boardpage.component';
import { BoardpageGuard } from '../../guards/boardpage/boardpage.guard';
import { CommentsComponent } from './components/comments/comments.component';

const routes: Routes = [
  {
    path: '',
    component: BoardpageComponent,
    canActivate: [BoardpageGuard],
    children: [
      { path: 'comments/:id', component: CommentsComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BoardpageRoutingModule {
}
