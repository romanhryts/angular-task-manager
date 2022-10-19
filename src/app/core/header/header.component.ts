import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { IUser } from '../../models/user/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: [ './header.component.css' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {
  @Input() isAuth!: boolean | null;
  @Input() user!: IUser | null;

  constructor(private readonly authService: AuthService) {
  }

  ngOnInit(): void {
  }

  logout(): void {
    this.authService.logout();
  }

}
