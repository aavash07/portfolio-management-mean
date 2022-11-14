import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { plainToClass } from 'class-transformer';
import { ToastrService } from 'ngx-toastr';
import { takeUntil } from 'rxjs/operators';
import { StockDetail } from 'src/app/Shared/models/stock-detail.model';
import { Stock } from 'src/app/Shared/models/stock.model';
import { StockDetailsService } from 'src/app/Shared/stock-details.service';
import { StocksService } from 'src/app/Shared/stocks.service';
import { subscribedContainerMixin } from 'src/app/Shared/subscribedContainer.mixin';

@Component({
  selector: 'app-stock-details-form',
  templateUrl: './stock-details-form.component.html',
})
export class StockDetailsFormComponent
  extends subscribedContainerMixin()
  implements OnInit
{
  public stocks: Stock[] = [];
  public stockDetail: StockDetail = new StockDetail();
  stockDetailsForm: FormGroup;
  public isLoading: boolean = false;

  constructor(
    public stockDetailsService: StockDetailsService,
    private toastr: ToastrService,
    private datePipe: DatePipe,
    private router: Router,
    public stockServices: StocksService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {
    super();
    this.stockDetailsForm = this.formBuilder.group({
      transactionType: ['', Validators.required],
      quantity: ['', Validators.required],
      amount: ['', Validators.required],
      transactionDate: ['', Validators.required],
      stockId: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.getAllStocks();
  }

  getStockDetailById(stockDetailId: string) {
    this.isLoading = true;
    this.stockDetailsService
      .getStockDetailById(stockDetailId)
      .pipe(takeUntil(this.destroyed$))
      .subscribe((res) => {
        this.stockDetail = res.data;
        this.populateForm();
        this.isLoading = false;
      });
  }

  getAllStocks(): void {
    this.stockServices
      .getAllStocks()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((res) => {
        this.stocks = res;
        const stockDetailId = this.route.snapshot.paramMap.get('id');
        if (stockDetailId) {
          this.getStockDetailById(stockDetailId);
        }
      });
  }

  populateForm(): void {
    this.stockDetailsForm.patchValue(this.stockDetail);
    this.stockDetailsForm.patchValue({
      transactionDate: this.datePipe.transform(
        this.stockDetail.transactionDate,
        'dd/MM/yyyy'
      ),
    });
    this.stockDetailsForm.patchValue({
      stockId: this.stockDetail.stock._id,
    });
  }

  submit() {
    const stockDetailId = this.route.snapshot.paramMap.get('id');
    if (this.stockDetailsForm.valid) {
      const stockDetail = {
        _id: this.stockDetail._id,
        transactionType: this.stockDetailsForm.value.transactionType,
        quantity: this.stockDetailsForm.value.quantity,
        amount: this.stockDetailsForm.value.amount,
        transactionDate: this.stockDetailsForm.value.transactionDate,
        stockId: this.stockDetailsForm.value.stockId,
      };
      const mappedStockDetail = plainToClass(StockDetail, stockDetail);
      if (stockDetailId) {
        this.updateRecord(mappedStockDetail);
        this.router.navigate(['']);
      } else {
        this.insertRecord(mappedStockDetail);
        this.router.navigate(['']);
      }
    }
  }

  insertRecord(stockDetail: StockDetail) {
    this.stockDetailsService.postStockDetails(stockDetail).subscribe(
      (res) => {
        this.stockDetailsForm.reset();
        this.toastr.success('Submitted Successfully', 'Stock Detail register');
      },
      (err) => {
        console.log(err);
      }
    );
  }

  updateRecord(stockDetail: StockDetail) {
    this.stockDetailsService.putStockDetails(stockDetail).subscribe(
      (res) => {
        this.stockDetailsForm.reset();
        this.toastr.info('Updated Successfully', 'Stock Detail update');
      },
      (err) => {
        console.log(err);
      }
    );
  }

  resetForm(form: NgForm) {
    form.form.reset();
    this.stockDetailsService.formData = new StockDetail();
  }
}
