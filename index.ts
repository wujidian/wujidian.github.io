import Router,{useRouter} from "next/router";
import { ParsedUrlQueryInput } from "querystring";
export const getLoc = (itemKey: string) => {
  return localStorage.getItem(itemKey);
};
export const setLoc = (itemKey: string, itemValue: any) => {
  return localStorage.setItem(itemKey, itemValue);
};
export const removeLoc = (itemKey: string) => {
  localStorage.removeItem(itemKey);
};

export const setQuery = (url: string, query: any) => {
  Router.push({
    pathname: url,
    query,
  });
  for (const key in query) {
    setLoc(key, query[key]);
  }
};

