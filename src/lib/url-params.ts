// "use client"
import { parseAsArrayOf, parseAsInteger, parseAsString } from 'nuqs/server'
import { createSearchParamsCache } from 'nuqs/server'

export const searchParamsParsers = {
    category: parseAsArrayOf(parseAsInteger).withDefault([]),
    query: parseAsString.withDefault(''),
    minPrice: parseAsInteger.withDefault(0),
    maxPrice: parseAsInteger.withDefault(2000),
    page: parseAsInteger.withDefault(1),
}

export const urlParamsCache = createSearchParamsCache(searchParamsParsers)