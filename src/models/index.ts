export type CryptoOrderStatus = "completed" | "pending" | "failed";

export interface CryptoOrder {
  id: string;
  status: CryptoOrderStatus;
  orderDetails: string;
  orderDate: number;
  orderID: string;
  sourceName: string;
  sourceDesc: string;
  amountCrypto: number;
  amount: number;
  cryptoCurrency: string;
  currency: string;
}

export interface Client {
  id: number;
  name: string;
  firstLetter?: string;
}

interface Review {
  author: string;
  date: string;
  rating: number;
  review: string;
  reviewid: number;
  type: string;
}

interface Link {
  active: boolean;
  label: string;
  url: string;
}

export interface ReviewsDataResponse {
  current_page: number;
  data: Review[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: Link[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}
