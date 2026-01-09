import type { PriceRange } from "@/services-lib/types";
import { ValidationError } from "@/shared/errors";

export function validatePriceRange(range: PriceRange): void {
  if (range.min !== null && range.max !== null && range.min > range.max) {
    throw new ValidationError(
      "Minimum price cannot be greater than maximum price",
    );
  }
}

export function validateId<T extends { id: unknown }>(id: T["id"]): void {
  // 1. Check for existence (null, undefined, or empty string)
  if (id === null || id === undefined || id === "") {
    throw new ValidationError("ID is required");
  }

  // 2. Numeric Validation
  if (typeof id === "number") {
    if (id < 0) {
      throw new ValidationError("ID cannot be negative");
    }
    if (id === 0) {
      throw new ValidationError("ID must be greater than zero");
    }
    if (!Number.isInteger(id)) {
      throw new ValidationError("ID must be a whole number");
    }
  }

  // 3. String Validation (if IDs can be strings)
  if (typeof id === "string") {
    // Check if it's a string representation of a negative number
    if (id.startsWith("-")) {
      throw new ValidationError("ID cannot be negative");
    }
    // Optional: Ensure it's not just whitespace
    if (id.trim().length === 0) {
      throw new ValidationError("ID cannot be an empty string");
    }
    throw new ValidationError("ID cannot be a string");
  }
}
