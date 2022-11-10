import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { StockDetailsView } from './models/stock-details-view.model';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { SingleStockProfit } from './models/single-stock-profit.model';
import { StockDetail } from './models/stock-detail.model';
import { StockProfit } from './models/stock-profit.model';

@Injectable({
  providedIn: 'root',
})
export class StockDetailsService {
  constructor(private http: HttpClient) {}

  formData: StockDetail = new StockDetail();

  public list: StockDetailsView[];

  readonly stockDetailsUrl = environment.apiURL + '/stock_details';

  public getAllStockDetails(): Observable<StockDetail[]> {
    return this.http.get<StockDetail[]>(`${this.stockDetailsUrl}`);
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

  stockById: StockDetailsView;
  getById(id: string) {
    this.http
      .get(`${this.stockDetailsUrl}/${id}`)
      .toPromise()
      .then((res) => (this.stockById = res as StockDetailsView));
  }

  getAllStockDetailss() {
    this.http
      .get(this.stockDetailsUrl)
      .toPromise()
      .then((res) => (this.list = res as StockDetailsView[]));
  }

  public profitView: StockProfit;
  readonly profitUrl = 'https://localhost:44361/api/StockDetails/getprofit';

  getProfit() {
    this.http
      .get(this.profitUrl)
      .toPromise()
      .then((res) => (this.profitView = res as StockProfit));
  }

  public singleProfitView: SingleStockProfit[];
  readonly singleProfitUrl =
    'https://localhost:44361/api/StockDetails/getprofitsingle';

  getProfitSingle() {
    this.http
      .get(this.singleProfitUrl)
      .toPromise()
      .then((res) => (this.singleProfitView = res as SingleStockProfit[]));
  }
}
