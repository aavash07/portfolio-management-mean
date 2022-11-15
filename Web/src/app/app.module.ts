import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from './app.component';
import { StockDetailsComponent } from './components/stock-details/stock-details.component';
import { StockDetailsFormComponent } from './components/stock-details/stock-details-form/stock-details-form.component';
import { StockProfitComponent } from './components/stock-details/stock-profit/stock-profit.component';
import { StockProfitSingleComponent } from './components/stock-details/stock-profit-single/stock-profit-single.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RoutingModule } from './routing.module';
import { CommonModule} from '@angular/common';
import { MatTabsModule} from '@angular/material/tabs';
import { MatSidenavModule} from '@angular/material/sidenav';
import {DatePipe} from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { JwtModule } from '@auth0/angular-jwt';
import { AuthGuard } from './auth/guards/auth-guard';

export function tokenGetter() {
  return localStorage.getItem("access_token");
}

@NgModule({
  declarations: [
    AppComponent,
    StockDetailsComponent,
    StockDetailsFormComponent,
    StockProfitComponent,
    StockProfitSingleComponent,
    LoginComponent,

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    RoutingModule,
    CommonModule,
    MatTabsModule,
    MatSidenavModule,
    ReactiveFormsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ['localhost:3000']
      }
    })
  ],
  exports:[
    MatSidenavModule
  ],
  providers: [DatePipe, AuthGuard],
  bootstrap: [AppComponent],

})
export class AppModule { }
