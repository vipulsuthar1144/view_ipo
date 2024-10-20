export interface Root {
  id: string;
  company_id: string;
  disclaimer: string;
  face_value: number;
  lot_size: number;
  lead_managers: string[];
  issue_objectives: string[];
  type: string;
  category: string;
  status: string;
  listing_at: string[];
  created_at: string;
  updated_at: string;
  issue_price: IssuePrice;
  issue_size: IssueSize;
  timeline: Timeline;
}

export interface IssuePrice {
  min: number;
  max: number;
}

export interface IssueSize {
  total: number;
  fresh: number;
  offer_for_sale: number;
}

export interface Timeline {
  open_date: string;
  end_date: string;
  allotment_date: string;
  listing_date: string;
  quota: Quota;
  applications: Applications;
  registrar: Registrar;
  docs: Docs;
  valuations: Valuations;
  subscriptions: Subscription[];
  lot_sizes: LotSize[];
  listing_price: any;
  subscription_rate: number;
}

export interface Quota {
  retail: number;
  nii: Nii;
  qib: number;
}

export interface Nii {
  s_nii: number;
  b_nii: number;
}

export interface Applications {
  retail: number;
  nii: Nii;
  qib: number;
  total: number;
}

export interface Registrar {
  name: string;
  phone: string;
  email: string;
  website: string;
}

export interface Docs {
  drph: string;
  rph: string;
  anchor: string;
}

export interface Valuations {
  earning_per_share: EarningPerShare;
  price_earning_ratio: PriceEarningRatio;
  return_on_net_worth: number;
}

export interface EarningPerShare {
  pre_ipo: number;
  post_ipo: number;
}

export interface PriceEarningRatio {
  pre_ipo: number;
  post_ipo: number;
}

export interface Subscription {
  date: string;
  retail: number;
  nii: Nii;
  qib: number;
  total: number;
}

export interface LotSize {
  application: string;
  lot: number;
  shares: number;
  amount: number;
}
