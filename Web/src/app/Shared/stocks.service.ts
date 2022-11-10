import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Stock } from './models/stock.model';

@Injectable({
  providedIn: 'root',
})
export class StocksService {
  constructor(private http: HttpClient) {}

  readonly stocksUrl = environment.apiURL + '/stocks';

  public getAllStocks(): Observable<Stock[]> {
    return this.http.get<Stock[]>(`${this.stocksUrl}`);
  }
}
