export type TQueryParams = {
    id?: number | TNullish;
    search: string;
    orderBy: string;
    orderDirection: "asc" | "desc";
    page: number;
    pageSize: number;
  };
  
  export async function handleQueryParams(queryParams: URLSearchParams):Promise<TQueryParams> {
  
    const id = Number(queryParams.get("id"));
    // Handle search query, if provided trim it
    const search = queryParams.get("search")?.trim() || "";
  
    // Default orderBy to 'createdAt', if the query parameter is missing or invalid
    const orderBy = queryParams.get("orderBy") || "createdAt";
  
    // Ensure orderDirection is either 'asc' or 'desc'
    const orderDirection =
      queryParams.get("orderDirection") === "desc" ? "desc" : "asc";
  
    // Ensure page is a positive integer, default to 1 if invalid
    const page = Math.max(1, Number(queryParams.get("page")) || 1);
  
    // Ensure limit is a positive integer, default to 10, limit to 100
    const pageSize = Math.min(
      100,
      Math.max(1, Number(queryParams.get("pageSize")) || 10)
    );
  
    return {
      search,
      orderBy,
      orderDirection,
      page,
      pageSize,
      id
    };
  }
  
  // get pagination
  
  import { TPagination } from "@/lib/todo/apiResponse";
  import { TNullish } from "./common-api-types";
  
  export async function getPagination<T>(
    model: any, 
    search: string | undefined, 
    searchableFields: string[], 
    page: number, 
    pageSize: number
  ): Promise<{ pagination: TPagination; totalCount: number }> {
    
    // Get total count
    const totalCount = await model.count({
      where: getFilters(search, searchableFields),
    });
  
    // Calculate total pages
    const totalPages = Math.ceil(totalCount / pageSize);
  
    return {
      pagination: {
        page,
        pageSize,
        totalPages,
        totalCount,
      },
      totalCount,
    };
  }
  
  
  export function getFilters(search?: string, fields: string[] = []) {
    if (!search?.trim() || fields.length === 0) return {};
  
    // Returns a filter that matches any of the fields for the search term
    return {
      OR: fields.map((field) => ({
        [field as string]: { contains: search }, // Case-insensitive search
      })),
    };
  }
  
  export function getOrderOptions(
    orderBy?: string,
    orderDirection?: string,
    allowedFields: string[] = []
  ): { field: string; direction: "asc" | "desc" } {
    const field = allowedFields.includes(orderBy ?? "")
      ? orderBy!
      : allowedFields[0] ?? "id";
    const direction: "asc" | "desc" = orderDirection === "desc" ? "desc" : "asc";
  
    return { field, direction };
  }
  
  export function getTotalPage(totalCount: number, pageSize: number) {
    return Math.ceil(totalCount / pageSize);
  }