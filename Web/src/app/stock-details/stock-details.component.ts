import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { StockDetail } from '../Shared/models/stock-detail.model';
import { StockDetailsService } from '../Shared/stock-details.service';
import { subscribedContainerMixin } from '../Shared/subscribedContainer.mixin';

@Component({
  selector: 'app-stock-details',
  templateUrl: './stock-details.component.html',
})
export class StockDetailsComponent
  extends subscribedContainerMixin()
  implements OnInit
{
  public stockDetails: StockDetail[] = [];

  constructor(
    public stockDetailsService: StockDetailsService,
    private toastr: ToastrService,
    private router: Router
  ) {
    super();
  }

  ngOnInit(): void {
    this.fetchAllStockDetails();
  }

  private fetchAllStockDetails(): void {
    this.stockDetailsService
      .getAllStockDetails()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((res) => {
        if (res && res.data) {
          this.stockDetails = res.data;
        }
      });
  }

  public editStockDetails(id: string): void {
    this.router.navigate(['edit',id]);
  }

  public onDelete(id: string): void {
    if (confirm('Are you sure to delete this record?')) {
      this.stockDetailsService.deleteStock(id).subscribe(
        (res) => {
          this.fetchAllStockDetails();
          this.toastr.error(
            'Deleted Successfully',
            'Stock Detail Registration'
          );
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }
}
