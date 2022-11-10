import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from './app.component';
import { StockDetailsComponent } from './stock-details/stock-details.component';
import { StockDetailsFormComponent } from './stock-details/stock-details-form/stock-details-form.component';
import { StockProfitComponent } from './stock-details/stock-profit/stock-profit.component';
import { StockProfitSingleComponent } from './stock-details/stock-profit-single/stock-profit-single.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RoutingModule } from './routing.module';
import { CommonModule} from '@angular/common';
import { MatTabsModule} from '@angular/material/tabs';
import { MatSidenavModule} from '@angular/material/sidenav';
import {DatePipe} from '@angular/common';



@NgModule({
  declarations: [
    AppComponent,
    StockDetailsComponent,
    StockDetailsFormComponent,
    StockProfitComponent,
    StockProfitSingleComponent,

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
  providers: [DatePipe],
  bootstrap: [AppComponent],

})
export class AppModule { }
