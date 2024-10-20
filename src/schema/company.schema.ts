export interface ICompanySchema {
  id?: string;
  name?: string;
  slug?: string;
  about?: string;
  logo?: string;
  contact_info?: IContactInfo;
  promoters?: string[];
  strengths?: string[];
  weaknesses?: string[];
  financials?: IFinancial[];
  created_at?: string;
  updated_at?: string;
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
