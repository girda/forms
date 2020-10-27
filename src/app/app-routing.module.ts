import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GuardServices } from './shared/services/guard.service';
import { FormsPageComponent } from './forms-page/forms-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { AuthLayoutComponent } from './shared/layouts/auth-layout/auth-layout.component';
import { SiteLayoutComponent } from './shared/layouts/site-layout/site-layout.component';


const routes: Routes = [
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {path: '', redirectTo: '/login', pathMatch: 'full'},
      {path: 'login', component: LoginPageComponent}
    ]
  },
  {
    path: '',
    component: SiteLayoutComponent,
    canActivate: [GuardServices],
    children: [
      {path: 'forms', component: FormsPageComponent},

    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }