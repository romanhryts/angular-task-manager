import { Pipe, PipeTransform } from '@angular/core';
import { IBoard } from '../../../models/board/board';

@Pipe({
  name: 'filterBoards'
})
export class FilterBoardsPipe implements PipeTransform {
  transform(boards: IBoard[], filterBy: string): IBoard[] {
    if (!filterBy) {
      return boards;
    }
    return boards.filter(b =>
      b.name.toLowerCase().includes(filterBy.toLowerCase())
      ||
      b.description.toLowerCase().includes(filterBy.toLowerCase())
      ||
      b.tasks.find(t => t.name.toLowerCase().includes(filterBy.toLowerCase()))
    )
  }

}
