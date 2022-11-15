import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from './app.component';
import { StockDetailsComponent } from './components/stock-details/stock-details.component';
import { StockDetailsFormComponent } from './components/stock-details-form/stock-details-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RoutingModule } from './routing.module';
import { CommonModule} from '@angular/common';
import { MatTabsModule} from '@angular/material/tabs';
import { MatSidenavModule} from '@angular/material/sidenav';
import {DatePipe} from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './auth/guards/auth-guard';
import { StockProfitSingleComponent } from './components/stock-profit-single/stock-profit-single.component';
import { StockProfitComponent } from './components/stock-profit/stock-profit.component';


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

  ],
  exports:[
    MatSidenavModule
  ],
  providers: [DatePipe, AuthGuard],
  bootstrap: [AppComponent],

})
export class AppModule { }
