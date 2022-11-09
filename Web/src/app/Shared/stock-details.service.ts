import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StockDetails } from './stock-details.model';
import { StockDetailsView } from './stock-details-view.model';
import { StockProfit } from './stock-profit.model';
import { SingleStockProfit } from './single-stock-profit.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class StockDetailsService {
  constructor(private http: HttpClient) {}

  formData: StockDetails = new StockDetails();

  public list: StockDetailsView[];

  readonly stockDetailsUrl = environment.apiURL + '/stocks-details';

  postStockDetails() {
    return this.http.post(this.stockDetailsUrl, this.formData);
  }

  putStockDetails() {
    return this.http.put(
      `${this.stockDetailsUrl}/${this.formData._id}`,
      this.formData
    );
  }

  deleteStock(id: number) {
    return this.http.delete(`${this.stockDetailsUrl}/${id}`);
  }

  stockById: StockDetailsView;
  getById(id: number) {
    this.http
      .get(`${this.stockDetailsUrl}/${id}`)
      .toPromise()
      .then((res) => (this.stockById = res as StockDetailsView));
  }

  getAllStocks() {
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
