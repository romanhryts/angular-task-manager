import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from './models/user/user';
import { AuthService } from './services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent implements OnInit {
  public title: string = 'Angular Task Manager';
  public auth$?: Observable<boolean>;
  public user$?: Observable<IUser | null>;

  constructor(private readonly authService: AuthService) {
  }

  ngOnInit(): void {
    this.authService.auth();
    this.auth$ = this.authService.authState.asObservable();
    this.user$ = this.authService.userState.asObservable();
  }

}
