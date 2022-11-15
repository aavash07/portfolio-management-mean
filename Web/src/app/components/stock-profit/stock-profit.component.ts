import { Component, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { StockProfit } from 'src/app/Shared/models/stock-profit.model';
import { StockDetailsService } from 'src/app/Shared/stock-details.service';
import { subscribedContainerMixin } from 'src/app/Shared/subscribedContainer.mixin';

@Component({
  selector: 'app-stock-profit',
  templateUrl: './stock-profit.component.html',
  styleUrls: ['./stock-profit.component.scss']
})
export class StockProfitComponent
  extends subscribedContainerMixin()
  implements OnInit
{
  constructor(
    public stockDetailsService: StockDetailsService,
  ) {
    super();
  }

  public stockProfit: StockProfit = new StockProfit();

  ngOnInit(): void {
    this.stockDetailsService
      .getProfit()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((res) => {
        if (res && res.data) {
          this.stockProfit = res.data;
        }
      });
  }
}
