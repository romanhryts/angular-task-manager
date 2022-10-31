import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register.component';
import { CanAuthGuard } from '../../guards/login-register/can-auth.guard';

const routes: Routes = [
  { path: '', component: RegisterComponent, canActivate: [CanAuthGuard] }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class RegisterRoutingModule {
}
