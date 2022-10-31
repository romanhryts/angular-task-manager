import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { IRegisterUser } from '../../models/user/register-user';
import { take } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: FormGroup = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl('')
  })

  public isError: boolean = false;

  constructor(private readonly authService: AuthService, private readonly router: Router) { }

  ngOnInit(): void {
  }

  register(): void {
    this.isError = false;
    const data: IRegisterUser = this.form.getRawValue();
    this.authService.register(data).pipe(take(1))
      .subscribe({
        next: () => {
          this.router.navigate(['login'])
        },
        error: () => this.isError = true
      });;
  }

}
