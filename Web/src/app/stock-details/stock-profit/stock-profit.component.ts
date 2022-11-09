import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { StockDetailsService } from 'src/app/Shared/stock-details.service';

@Component({
  selector: 'app-stock-profit',
  templateUrl: './stock-profit.component.html',
})
export class StockProfitComponent implements OnInit {

  constructor(public service:StockDetailsService,private router:Router,private http:HttpClient) { }

  profit:string="Profit";


  ngOnInit(): void {
    this.service.getProfit();
  }
}
