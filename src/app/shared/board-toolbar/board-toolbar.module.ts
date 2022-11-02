import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardToolbarComponent } from './board-toolbar.component';



@NgModule({
  declarations: [
    BoardToolbarComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    BoardToolbarComponent
  ]
})
export class BoardToolbarModule { }
