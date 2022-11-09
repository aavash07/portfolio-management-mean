import { Stock } from "./stock.model";

export class StockDetails {
  _id?: number;
  transactionType?: string;
  quantity?: number;
  amount?: number;
  transactionDate?: string;
  stock?: Stock;
}
