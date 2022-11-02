import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageGuard } from '../../guards/homepage/homepage.guard';
import { HomepageComponent } from './components/homepage/homepage.component';
import { BoardDataResolver } from '../../resolvers/boards/board-data.resolver';

const routes: Routes = [
  { path: '', canActivate: [HomepageGuard], component: HomepageComponent, resolve: {data: BoardDataResolver} }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomepageRoutingModule {
}
