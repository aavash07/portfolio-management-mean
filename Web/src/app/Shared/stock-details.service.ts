import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { StockDetailsView } from './models/stock-details-view.model';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { SingleStockProfit } from './models/single-stock-profit.model';
import { StockDetail } from './models/stock-detail.model';
import { StockProfit } from './models/stock-profit.model';
import { ApiResponse } from './models/api-response.model';

@Injectable({
  providedIn: 'root',
})
export class StockDetailsService {
  constructor(private http: HttpClient) {}

  formData: StockDetail = new StockDetail();

  public list: StockDetailsView[];

  readonly stockDetailsUrl = environment.apiURL + '/stock_details';

  public getAllStockDetails(): Observable<ApiResponse<StockDetail[]>> {
    return this.http.get<ApiResponse<StockDetail[]>>(`${this.stockDetailsUrl}`);
  }

  public getStockDetailById(id: string): Observable<StockDetail> {
    return this.http.get<StockDetail>(`${this.stockDetailsUrl}/${id}`);
  }

  public postStockDetails(stockDetail: StockDetail): Observable<StockDetail> {
    return this.http.post<any>(this.stockDetailsUrl, { stockDetail });
  }

  public putStockDetails(stockDetail: StockDetail) {
    return this.http.put(`${this.stockDetailsUrl}/${stockDetail._id}`, {
      stockDetail,
    });
  }

  public deleteStock(id: string) {
    return this.http.delete(`${this.stockDetailsUrl}/${id}`);
  }

  public getProfit(): Observable<ApiResponse<StockProfit>> {
    return this.http.get<ApiResponse<StockProfit>>(
      `${this.stockDetailsUrl}/profit`
    );
  }

  public getStockProfit(): Observable<ApiResponse<StockProfit[]>> {
    return this.http.get<ApiResponse<StockProfit[]>>(
      `${this.stockDetailsUrl}/stock_profit`
    );
  }
}
