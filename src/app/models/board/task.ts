type TaskStatus = 'TODO' | 'PROGRESS' | 'DONE' | 'ARCHIVE'

export interface ITask {
  _id: string;
  createdAt: string;
  name: string;
  status: TaskStatus;
  comments: string[]
}
