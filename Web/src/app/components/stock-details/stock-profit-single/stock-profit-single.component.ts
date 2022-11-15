import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { StockProfit } from 'src/app/Shared/models/stock-profit.model';
import { StockDetailsService } from 'src/app/Shared/stock-details.service';
import { StocksService } from 'src/app/Shared/stocks.service';
import { subscribedContainerMixin } from 'src/app/Shared/subscribedContainer.mixin';

@Component({
  selector: 'app-stock-profit-single',
  templateUrl: './stock-profit-single.component.html',
})
export class StockProfitSingleComponent
  extends subscribedContainerMixin()
  implements OnInit
{
  public stockProfits: StockProfit[] = [];

  constructor(
    public stockDetailsService: StockDetailsService,
    private router: Router,
    private http: HttpClient
  ) {
    super();
  }

  ngOnInit(): void {
    this.stockDetailsService
      .getStockProfit()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((res) => {
        if (res && res.data) {
          this.stockProfits = res.data;
        }
      });
  }
}
