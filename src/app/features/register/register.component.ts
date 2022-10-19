import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { IRegisterUser } from '../../models/user/register-user';

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

  constructor(private readonly authService: AuthService) { }

  ngOnInit(): void {
  }

  register(): void {
    const data: IRegisterUser = this.form.getRawValue();
    this.authService.register(data);
  }

}
