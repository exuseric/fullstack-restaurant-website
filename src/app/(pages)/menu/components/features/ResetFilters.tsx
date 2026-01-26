"use client";
import { Button } from "@/components/shared/button";
import { useResetFilters } from "@/hooks/use-reset-filters";

export function ResetFilters() {
  const { resetFilters } = useResetFilters();

  return (
    <Button onClick={() => resetFilters()} variant="quiet">
      Reset all
    </Button>
  );
}