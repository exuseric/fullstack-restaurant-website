import type { PriceRange } from "@/server/services/lib/types";
import { ValidationError } from "@/shared/errors";
import type { MenuCategory, MenuItem } from "@/shared/types";

export function validatePriceRange(range: PriceRange): void {
    if (range.min !== null && range.max !== null && range.min > range.max) {
        throw new Error("Minimum price cannot be greater than maximum price");
    }
}

export function validateId(id: MenuItem["id"] | MenuCategory["id"]): void {
    if (!id) {
        throw new ValidationError("id is required");
    }
}