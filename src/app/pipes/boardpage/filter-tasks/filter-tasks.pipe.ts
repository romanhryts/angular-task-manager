import { Pipe, PipeTransform } from '@angular/core';
import { ITask } from '../../../models/board/task';

@Pipe({
  name: 'filterTasks'
})
export class FilterTasksPipe implements PipeTransform {

  transform(array: ITask[], filterBy: string): ITask[] {
    if (!filterBy) {
      return array;
    }
    return array.filter(t => t.name.toLowerCase().includes(filterBy.toLowerCase()));
  }

}
