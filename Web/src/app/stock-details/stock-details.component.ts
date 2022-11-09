import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { StockDetails } from '../Shared/stock-details.model';
import { StockDetailsService } from '../Shared/stock-details.service';

@Component({
  selector: 'app-stock-details',
  templateUrl: './stock-details.component.html',
})
export class StockDetailsComponent implements OnInit {

  constructor(public stockDetailsService:StockDetailsService,private toastr:ToastrService,private router:Router) { }

  ngOnInit(): void {
    this.stockDetailsService.getAllStocks();
  }

  populateForm(id:number){
    this.stockDetailsService.getById(id);
    var stockDetail= new StockDetails;
    stockDetail._id=id;
    stockDetail.transactionType=this.stockDetailsService.stockById.transactionType;
    stockDetail.quantity=this.stockDetailsService.stockById.quantity;
    stockDetail.amount=this.stockDetailsService.stockById.amount;
    stockDetail.transactionDate=this.stockDetailsService.stockById.transactionDate;
    this.stockDetailsService.formData = stockDetail;
    this.router.navigate(['add']);
  }

  onDelete(id:number){
    if(confirm('Are you sure to delete this record?'))
    {
    this.stockDetailsService.deleteStock(id)
    .subscribe(
      res=>{
        this.stockDetailsService.getAllStocks();
        this.toastr.error("Deleted Successfully",'Stock Detail Registration');
      },
      err=>{console.log(err)}
    )
    }
  }

}
