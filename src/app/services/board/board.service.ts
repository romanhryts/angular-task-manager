import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Board } from '../../models/board/board';

@Injectable({
  providedIn: 'root'
})
export class BoardService {

  private readonly api: string = 'http://localhost:8000/api/';

  constructor(private http: HttpClient) {
  }

  getBoards(): Observable<Board[]> {
    const link: string = this.api + 'boards';
    return this.http.get<Board[]>(link, {withCredentials: true});
  }

}
