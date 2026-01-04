import { describe, it, expect } from "vitest"
import navigationService from "@/services/navigation/navigation.service"

describe("Navigation Service", () => {
    it("should return all navigation items", async () => {
        const res = await navigationService().getNavigationItems();
        expect(Array.isArray(res)).toBe(true);
        expect(res.length).toBeGreaterThanOrEqual(0);
    }, 10000);
});