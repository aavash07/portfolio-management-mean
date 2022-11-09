import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { StockDetails } from 'src/app/Shared/stock-details.model';
import { StockDetailsService } from 'src/app/Shared/stock-details.service';
import { StocksService } from 'src/app/Shared/stocks.service';


@Component({
  selector: 'app-stock-profit-single',
  templateUrl: './stock-profit-single.component.html',
})
export class StockProfitSingleComponent implements OnInit {

  constructor(public service:StockDetailsService,private router:Router,private http:HttpClient) { }

  ngOnInit(): void {

    this.service.getProfitSingle();
  }



}
