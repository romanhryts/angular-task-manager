import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CoreModule } from './core/core.module';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HomepageComponent } from './features/homepage/homepage.component';
import { BoardComponent } from './features/homepage/components/board/board.component';
import { BoardModalComponent } from './features/homepage/components/board-modal/board-modal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BoardToolbarComponent } from './features/homepage/components/board-toolbar/board-toolbar.component';
import { FilterBoardsPipe } from './pipes/homepage/filter-boards/filter-boards.pipe';
import { SortBoardsPipe } from './pipes/homepage/sort-boards/sort-boards.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    BoardComponent,
    BoardModalComponent,
    BoardToolbarComponent,
    FilterBoardsPipe,
    SortBoardsPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CoreModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
