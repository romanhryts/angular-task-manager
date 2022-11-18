import { Pipe, PipeTransform } from '@angular/core';
import { IBoard } from '../../../models/board/board';

@Pipe({
  name: 'sortBoard'
})
export class SortBoardsPipe implements PipeTransform {

  transform(boards: IBoard[], type: string, field: string): IBoard[] {
    let sorted: IBoard[];
    switch (field) {
      case 'name':
        type === 'ASC'
          ? sorted = [...boards].sort((a, b) => this.sortByNameAsc(a, b))
          : sorted = [...boards].sort((a, b) => this.sortByNameAsc(a, b)).reverse()
        break;
      case 'date':
        type === 'ASC'
          ? sorted = [...boards].sort((a, b) => this.sortByDateDesc(a, b)).reverse()
          : sorted = [...boards].sort((a, b) => this.sortByDateDesc(a, b))
        break;
      case 'todo':
        type === 'ASC'
          ? sorted = [...boards].sort((a, b) => this.sortByStatusDesc(a, b, 'TODO')).reverse()
          : sorted = [...boards].sort((a, b) => this.sortByStatusDesc(a, b, 'TODO'))
        break;
      case 'progress':
        type === 'ASC'
          ? sorted = [...boards].sort((a, b) => this.sortByStatusDesc(a, b, 'PROGRESS')).reverse()
          : sorted = [...boards].sort((a, b) => this.sortByStatusDesc(a, b, 'PROGRESS'))
        break;
      case 'done':
        type === 'ASC'
          ? sorted = [...boards].sort((a, b) => this.sortByStatusDesc(a, b, 'DONE')).reverse()
          : sorted = [...boards].sort((a, b) => this.sortByStatusDesc(a, b, 'DONE'))
        break;
      default:
        sorted = boards;
        break;
    }
    return sorted;
  }

  sortByNameAsc(a: IBoard, b: IBoard): number {
    if (a.name < b.name) return -1;
    if (a.name > b.name) return 1;
    return 0;
  }

  sortByDateDesc(a: IBoard, b: IBoard): number {
    return +new Date(a.createdAt) - +new Date(b.createdAt);
  }

  sortByStatusDesc(a: IBoard, b: IBoard, status: string): number {
    const todosInFirst = a.tasks.filter(t => t.status === status).length;
    const todosInSecond = b.tasks.filter(t => t.status === status).length;
    return todosInSecond - todosInFirst;
  }

}
