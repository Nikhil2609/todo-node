export interface APIResponse {
  data?: any;
  meta?: IMetaTokenResponse | IMetaPaginationResponse;
  message?: string;
  error?: string;
}

export interface IMetaTokenResponse {
  token?: string;
}

export interface IMetaPaginationResponse {
  currentPage: number;
  totalItems: number;
  totalPages: number;
}
