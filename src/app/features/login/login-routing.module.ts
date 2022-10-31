import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login.component';
import { CanAuthGuard } from '../../guards/login-register/can-auth.guard';

const routes: Routes = [
  { path: '', component: LoginComponent, canActivate: [CanAuthGuard] }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class LoginRoutingModule {
}
