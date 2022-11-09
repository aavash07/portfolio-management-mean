import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { StockDetails } from 'src/app/Shared/stock-details.model';
import { StockDetailsService } from 'src/app/Shared/stock-details.service';
import { StocksService } from 'src/app/Shared/stocks.service';

@Component({
  selector: 'app-stock-details-form',
  templateUrl: './stock-details-form.component.html',
})
export class StockDetailsFormComponent implements OnInit {

  constructor(public service:StockDetailsService,private toastr:ToastrService,private datePipe:DatePipe,private router:Router,public stockServices:StocksService) { }

  ngOnInit(): void {
    this.stockServices.getStocks();
  }

  onSubmit(form:NgForm){
    if(this.service.formData._id==0){
      this.insertRecord(form);
      this.router.navigate(['']);
    }
    else{
      this.updateRecord(form);
      this.router.navigate(['']);
    }

  }

  insertRecord(form:NgForm){
    this.service.postStockDetails().subscribe(
      res=>{
          this.resetForm(form);
          this.service.getAllStocks();
          this.toastr.success('Submitted Successfully','Stock Detail register');
      },
      err=>{console.log(err);}
    );
  }

  updateRecord(form:NgForm){
    this.service.putStockDetails().subscribe(
      res=>{
          this.resetForm(form);
          this.service.getAllStocks();
          this.toastr.info('Updated Successfully','Stock Detail update');
      },
      err=>{console.log(err);}
    );
  }

  resetForm(form:NgForm){
    form.form.reset();
    this.service.formData= new StockDetails();
  }


}
