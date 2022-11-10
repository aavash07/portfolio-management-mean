import { Stock } from "./stock.model";

export class StockDetail {
  _id: string;
  transactionType?: string;
  quantity?: number;
  amount?: number;
  transactionDate?: string;
  stockId?: string;
  stock?: Stock;
}
