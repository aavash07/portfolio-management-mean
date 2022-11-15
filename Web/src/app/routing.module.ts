import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { StockDetailsComponent } from './components/stock-details/stock-details.component';
import { StockDetailsFormComponent } from './components/stock-details-form/stock-details-form.component';
import { AuthGuard } from './auth/guards/auth-guard';
import { StockProfitSingleComponent } from './components/stock-profit-single/stock-profit-single.component';
import { StockProfitComponent } from './components/stock-profit/stock-profit.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    children: [
      { path: 'home', component: StockDetailsComponent },
      { path: '', redirectTo: '/home', pathMatch: 'full' },
      { path: 'add', component: StockDetailsFormComponent },
      { path: 'edit/:id', component: StockDetailsFormComponent },
      { path: 'profit', component: StockProfitComponent },
      { path: 'single-profit', component: StockProfitSingleComponent },
    ],
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class RoutingModule {}
