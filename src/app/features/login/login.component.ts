import { Component, OnInit } from '@angular/core';
import { ILoginUser } from '../../models/user/login-user';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { take } from 'rxjs';
import { IUser } from '../../models/user/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.css' ]
})
export class LoginComponent implements OnInit {
  public form: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });
  public isError: boolean = false;

  constructor(private readonly authService: AuthService, private readonly router: Router) {
  }

  ngOnInit(): void {
  }

  login(): void {
    this.isError = false;
    const data: ILoginUser = this.form.getRawValue();
    this.authService.login(data)
      .pipe(take(1))
      .subscribe({
        next: (value: IUser) => {
          this.authService.authState.next(true);
          this.authService.userState.next(value);
          this.router.navigate(['']).catch(console.log);
        },
        error: () => {
          this.authService.authState.next(false);
          this.authService.userState.next(null);
          this.isError = true;
        }
      });;
  }

}
