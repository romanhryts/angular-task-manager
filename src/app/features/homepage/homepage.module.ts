import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomepageRoutingModule } from './homepage-routing.module';
import { HomepageComponent } from './components/homepage/homepage.component';
import { BoardComponent } from './components/board/board.component';
import { BoardModalComponent } from './components/board-modal/board-modal.component';
import { FilterBoardsPipe } from '../../pipes/homepage/filter-boards/filter-boards.pipe';
import { SortBoardsPipe } from '../../pipes/homepage/sort-boards/sort-boards.pipe';
import { ReactiveFormsModule } from '@angular/forms';
import { BoardToolbarModule } from '../../shared/board-toolbar/board-toolbar.module';
import { WindowClickDetectDirective } from '../../directives/window-click-detect/window-click-detect.directive';


@NgModule({
  declarations: [
    HomepageComponent,
    BoardComponent,
    BoardModalComponent,
    FilterBoardsPipe,
    SortBoardsPipe,
    WindowClickDetectDirective
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HomepageRoutingModule,
    BoardToolbarModule
  ],
  exports: [WindowClickDetectDirective]
})
export class HomepageModule {
}
