type TGenerateQueryStringOptions = {
    skipNull?: boolean;
    skipEmptyString?: boolean;
    stringifyToPreserveTypes?: boolean;
  };
  type TGenerateQueryString = (
    args: Record<string, unknown> | null | undefined | void,
    options?: TGenerateQueryStringOptions,
  ) => {
    queryString: string;
  };
  
  export const generateQueryString: TGenerateQueryString = (args, options) => {
    if (
      !args ||
      (typeof args === "object" && Array.isArray(args)) ||
      typeof args === "number" ||
      typeof args === "string" ||
      typeof args === "function" ||
      typeof args === "boolean"
    ) {
      return { queryString: "" };
    }
  
    const searchParams = new URLSearchParams();
  
    for (const [key, value] of Object.entries(args)) {
      if (
        typeof value === "undefined" ||
        (options?.skipNull && value === null) ||
        (options?.skipEmptyString && value === "")
      ) {
        continue;
      }
  
      let stringifiedValue: string = "";
      if (options?.stringifyToPreserveTypes) {
        try {
          stringifiedValue = JSON.stringify(value);
        } catch (error) {
          console.warn(`Circular reference detected in key "${key}". Skipping.`);
          continue;
        }
      } else {
        stringifiedValue = String(value);
      }
  
      searchParams.append(key, stringifiedValue);
    }
  
    const queryString = searchParams.toString();
    return { queryString: queryString ? `?${queryString}` : "" };
  };