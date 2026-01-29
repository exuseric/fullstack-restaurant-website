import { createSearchParamsCache } from "nuqs/server";
import {searchParamsParsers} from "./url-params";

export const urlParamsCache = createSearchParamsCache(searchParamsParsers);