import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoardpageComponent } from './components/boardpage/boardpage.component';
import { BoardpageGuard } from '../../guards/boardpage/boardpage.guard';

const routes: Routes = [
  { path: '', component: BoardpageComponent, canActivate: [BoardpageGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BoardpageRoutingModule {
}
