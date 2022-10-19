import { Component, OnInit } from '@angular/core';
import { ILoginUser } from '../../models/user/login-user';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';

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

  constructor(private readonly authService: AuthService) {
  }

  ngOnInit(): void {
  }

  login(): void {
    const data: ILoginUser = this.form.getRawValue();
    this.authService.login(data);
  }

}
