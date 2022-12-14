import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IBoard } from '../../models/board/board';
import { IAddBoard } from '../../models/board/add-board';


@Injectable({
  providedIn: 'root'
})
export class BoardService {
  private readonly api: string = 'http://localhost:8000/api/boards/';

  constructor(private http: HttpClient) {
  }

  getBoards(): Observable<IBoard[]> {
    return this.http.get<IBoard[]>(this.api, { withCredentials: true });
  }

  getBoard(id: string): Observable<IBoard> {
    return this.http.get<IBoard>(this.api + id);
  }

  addBoard(data: IAddBoard): Observable<IBoard> {
    return this.http.post<IBoard>(this.api, data);
  }

  deleteBoard(id: string): Observable<string> {
    return this.http.delete<string>(this.api + id);
  }

  editBoard(data: IAddBoard): Observable<IBoard> {
    return this.http.put<IBoard>(this.api, data);
  }

  editListColor(boardId: string, listType: string, value: string): Observable<string> {
    const link: string = `${this.api}${boardId}`;
    return this.http.patch<string>(link, {
      "field": listType,
      "value": JSON.stringify(value)
    });
  }

}
