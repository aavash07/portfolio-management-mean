import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import{Routes,RouterModule} from '@angular/router';
import{ StockDetailsComponent } from './stock-details/stock-details.component';
import { StockDetailsFormComponent } from './stock-details/stock-details-form/stock-details-form.component';
import { StockProfitComponent } from './stock-details/stock-profit/stock-profit.component';
import { StockProfitSingleComponent } from './stock-details/stock-profit-single/stock-profit-single.component';

const routes: Routes=[
  {path:'home',component:StockDetailsComponent},
  {path: '',redirectTo:'/home',pathMatch:'full'},
  {path:'add',component:StockDetailsFormComponent},
  {path:'edit/:id',component:StockDetailsFormComponent},
  {path:'profit', component:StockProfitComponent},
  {path:'single-profit',component:StockProfitSingleComponent}
]


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports:[
    RouterModule
  ]
})
export class RoutingModule { }
