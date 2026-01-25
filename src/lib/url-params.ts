// "use client"
import {
  createSearchParamsCache,
  parseAsArrayOf,
  parseAsInteger,
  parseAsString,
} from "nuqs/server";

export const searchParamsParsers = {
  category: parseAsArrayOf(parseAsInteger).withDefault([]),
  query: parseAsString.withDefault(""),
  minPrice: parseAsInteger.withDefault(0),
  maxPrice: parseAsInteger.withDefault(2000),
  page: parseAsInteger.withDefault(1),
} as const;

export type SearchParamsType = typeof searchParamsParsers;

export type SearchParamsKeys = keyof typeof searchParamsParsers

export const urlParamsCache = createSearchParamsCache(searchParamsParsers)