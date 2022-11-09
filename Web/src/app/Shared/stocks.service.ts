import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Stock } from './stock.model';

@Injectable({
  providedIn: 'root'
})
export class StocksService {

  constructor(private http:HttpClient) { }

  readonly stocksUrl = environment.apiURL + '/stocks'

  public list:Stock[];

  getStocks(){
    this.http.get(this.stocksUrl)
    .toPromise()
    .then(res=> this.list = res as Stock[]);
  }
}
