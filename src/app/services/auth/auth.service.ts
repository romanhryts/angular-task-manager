import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ILoginUser } from '../../models/user/login-user';
import { IUser } from '../../models/user/user';
import { IRegisterUser } from '../../models/user/register-user';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly api: string = 'http://localhost:8000/api/';
  public authState = new BehaviorSubject<boolean>(false);
  public userState = new BehaviorSubject<IUser | null>(null)


  constructor(private readonly http: HttpClient, private readonly router: Router) {
  }

  login(data: ILoginUser): Observable<IUser> {
    return this.http.post<IUser>(this.api + 'login', data, { withCredentials: true })

  }

  register(data: IRegisterUser): Observable<{message: string; status: number}> {
    return this.http.post<{ message: string, status: number }>(this.api + 'register', data);

  }

  logout(): void {
    this.http
      .post<{ message: string, status: number }>(this.api + 'logout', null, { withCredentials: true })
      .pipe(take(1))
      .subscribe({
        next: () => {
          this.authState.next(false);
          this.userState.next(null);
          this.router.navigate(['login']);
        },
        error: (err) => console.log(err)
      });
  }

  auth(): void {
    this.http
      .get<IUser>(this.api + 'auth', { withCredentials: true })
      .pipe(take(1))
      .subscribe({
        next: (value: IUser) => {
          this.authState.next(true);
          this.userState.next(value);
        },
        error: () => {
          this.authState.next(false);
          this.userState.next(null);
        }
      })
  }

  checkAuth(): Observable<IUser> {
    return this.http.get<IUser>(this.api + 'auth', { withCredentials: true });
  }
}
