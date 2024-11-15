export interface IIPOSchema {
  id?: string;
  is_active?: boolean;
  company_name?: string;
  company_logo?: string;
  slug?: string;
  company_about?: string;
  company_contact_info?: IContactInfo;
  company_promoters?: string[];
  company_strengths?: string[];
  company_weaknesses?: string[];
  company_financials?: IFinancial[];
  disclaimer?: string;
  face_value?: number;
  issue_price?: IIssuePrice;
  issue_size?: IIssueSize;
  lot_size?: number;
  timeline?: ITimeline;
  quota?: IQuota;
  applications?: IApplications;
  registrar?: IRegistrar;
  docs?: IDocs;
  valuations?: IValuations;
  subscription_rate?: number;
  subscriptions?: ISubscription[];
  lot_sizes?: ILotSize[];
  lead_managers?: IString[];
  issue_objectives?: string[];
  type?: string;
  category?: string;
  status?: string;
  listing_at?: string[];
  listing_price?: number;
  created_at?: string;
  updated_at?: string;
}

export interface IIssuePrice {
  min?: Number;
  max?: Number;
}

type IString = string;

export interface IIssueSize {
  total?: number;
  fresh?: number;
  offer_for_sale?: number;
}

export interface ITimeline {
  open_date?: string;
  end_date?: string;
  allotment_date?: string;
  listing_date?: string;
}

export interface IQuota {
  retail?: number;
  nii?: INii;
  qib?: number;
}

export interface INii {
  s_nii?: number;
  b_nii?: number;
  total?: number;
}

export interface IApplications {
  retail?: number;
  nii?: INii;
  qib?: number;
  total?: number;
}

export interface IRegistrar {
  name?: string;
  phone?: string;
  email?: string;
  website?: string;
}

export interface IDocs {
  drph?: string;
  rph?: string;
  anchor?: string;
}

export interface IValuations {
  earning_per_share?: IEarningPerShare;
  price_earning_ratio?: IPriceEarningRatio;
  return_on_net_worth?: number;
}

export interface IEarningPerShare {
  pre_ipo?: number;
  post_ipo?: number;
}

export interface IPriceEarningRatio {
  pre_ipo?: number;
  post_ipo?: number;
}

export interface ISubscription {
  date?: string;
  retail?: number;
  nii?: INii;
  qib?: number;
  total?: number;
}

export interface ILotSize {
  application?: string;
  lot?: number;
  shares?: number;
  amount?: number;
}

export interface IContactInfo {
  address: string;
  phone: string;
  email: string;
  website: string;
}

export interface IFinancial {
  period: string;
  revenue: number;
  assets: number;
  profit: number;
}

export interface ITimeStamps {
  seconds: number;
  nanoseconds: number;
}
