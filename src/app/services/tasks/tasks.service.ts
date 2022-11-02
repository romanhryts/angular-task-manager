import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ITask } from '../../models/board/task';

type AddTaskStatus = 'TODO' | 'PROGRESS' | 'DONE';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  private readonly api: string = 'http://localhost:8000/api/boards/';

  constructor(private http: HttpClient) {
  }

  deleteTask(id: string, boardId: string): Observable<string> {
    return this.http.delete<string>(`${this.api + boardId}/task/${id}`);
  }

  addTask(boardId: string, name: string, status: AddTaskStatus): Observable<ITask> {
    return this.http.post<ITask>(this.api + 'task', {
      board_id: boardId,
      name,
      status
    });
  }

  updateTask(id: string, name?: string, status?: string): Observable<ITask> {
    return this.http.put<ITask>(this.api + 'task', {
      id,
      name: name ? name : null,
      status: status ? status : null
    });
  }
}
