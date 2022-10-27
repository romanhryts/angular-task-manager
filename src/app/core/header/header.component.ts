import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { IUser } from '../../models/user/user';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: [ './header.component.css' ]
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Input() isAuth!: boolean | null;
  @Input() user!: IUser | null;
  showDashLink: boolean = false;
  routerSubscription!: Subscription;

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) {
  }

  ngOnInit(): void {
    this.routerSubscription = this.router.events.subscribe({
      next: (event) => {
        if (event instanceof NavigationEnd) {
          this.showDashLink = event.url === '/' || event.url === '/dashboard' ? false : true;
        }
      }
    })
  }

  ngOnDestroy(): void {
    this.routerSubscription.unsubscribe();
  }

  logout(): void {
    this.authService.logout();
  }

}
