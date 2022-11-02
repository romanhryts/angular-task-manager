import { ITask } from './task';

export interface IBoard {
  _id: string;
  user_id: string;
  name: string;
  description: string;
  createdAt: string;
  todoListColor: string;
  progressListColor: string;
  doneListColor: string;
  tasks: ITask[];
}
