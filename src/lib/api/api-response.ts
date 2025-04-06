export type TPagination = {
  page: number;
  pageSize: number;
  totalPages: number;
  totalCount: number;
};

export type TErrors = {
  message: string;
};
export type TPaginatedResponse<T> = {
  data?: T[];
  pagination: TPagination;
};

export type TApiResponse<T = unknown> = {
  success: boolean;
  statusCode: number;
  message: string;
  data?: T | null;
  pagination?: TPagination;
  errors?: TErrors[];
};
export function apiResponse<T>({
  success,
  statusCode,
  message,
  data,
  pagination,
  errors,
}: TApiResponse<T>): TApiResponse<T> {
  return {
    success,
    statusCode,
    message,
    data,
    pagination,
    errors,
  };
}
