import { Pipe, PipeTransform } from '@angular/core';
import { ITask } from '../../../models/board/task';

@Pipe({
  name: 'sortTasks'
})
export class SortTasksPipe implements PipeTransform {

  transform(tasks: ITask[], sortType: string, sortField: string): ITask[] {
    let sorted: ITask[];
    switch (sortField) {
      case 'name':
        sortType === 'ASC'
          ? sorted = [...tasks].sort((a, b) => this.sortByNameAsc(a, b))
          : sorted = [...tasks].sort((a, b) => this.sortByNameAsc(a, b)).reverse()
        break;
      default:
        sortType === 'ASC'
          ? sorted = [...tasks].sort((a, b) => this.sortByDateDesc(a, b)).reverse()
          : sorted = [...tasks].sort((a, b) => this.sortByDateDesc(a, b))
        break;
    }
    return sorted;
  }

  sortByNameAsc(a: ITask, b: ITask): number {
    if (a.name < b.name) return 1;
    if (a.name > b.name) return -1;
    return 0;
  }

  sortByDateDesc(a: ITask, b: ITask): number {
    return +new Date(a.createdAt) - +new Date(b.createdAt);
  }

}
