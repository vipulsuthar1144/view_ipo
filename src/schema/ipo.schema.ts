export interface IIPOSchema {
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
  name: string;
  listing_at: string[];
  created_at: string;
  updated_at: string;
  issue_price: IIssuePrice;
  issue_size: IIssueSize;
  timeline: ITimeline;
  quota: IQuota;
  applications: IApplications;
  registrar: IRegistrar;
  docs: IDocs;
  valuations: IValuations;
  subscriptions: ISubscription[];
  lot_sizes: ILotSize[];
  listing_price: any;
  subscription_rate: number;
}

export interface IIssuePrice {
  min: number;
  max: number;
}

export interface IIssueSize {
  total: number;
  fresh: number;
  offer_for_sale: number;
}

export interface ITimeline {
  open_date: string;
  end_date: string;
  allotment_date: string;
  listing_date: string;
}

export interface IQuota {
  retail: number;
  nii: INii;
  qib: number;
}

export interface INii {
  s_nii: number;
  b_nii: number;
  total: number;
}

export interface IApplications {
  retail: number;
  nii: INii;
  qib: number;
  total: number;
}

export interface IRegistrar {
  name: string;
  phone: string;
  email: string;
  website: string;
}

export interface IDocs {
  drph: string;
  rph: string;
  anchor: string;
}

export interface IValuations {
  earning_per_share: IEarningPerShare;
  price_earning_ratio: IPriceEarningRatio;
  return_on_net_worth: number;
}

export interface IEarningPerShare {
  pre_ipo: number;
  post_ipo: number;
}

export interface IPriceEarningRatio {
  pre_ipo: number;
  post_ipo: number;
}

export interface ISubscription {
  date: string;
  retail: number;
  nii: INii;
  qib: number;
  total: number;
}

export interface ILotSize {
  application: string;
  lot: number;
  shares: number;
  amount: number;
}
