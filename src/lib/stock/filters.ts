import { type Vehicle, vehicles } from "@/data/vehicles";

export type SortOption =
  | "monthly-asc"
  | "price-asc"
  | "price-desc"
  | "newest"
  | "mileage-asc";

export interface StockFilters {
  makes: string[];
  models: string[];
  fuelTypes: string[];
  transmissions: string[];
  yearMin: number;
  yearMax: number;
  mileageMin: number;
  mileageMax: number;
  priceMin: number;
  priceMax: number;
  monthlyBudgetMax: number;
}

export interface BudgetSearch {
  monthly: number;
  deposit: number;
  term: number;
}

export const YEAR_MIN = 2019;
export const YEAR_MAX = 2023;
export const MILEAGE_MAX = 50000;
export const PRICE_MAX = 30000;
export const MONTHLY_MIN = 150;
export const MONTHLY_MAX = 900;

export const defaultFilters: StockFilters = {
  makes: [],
  models: [],
  fuelTypes: [],
  transmissions: [],
  yearMin: YEAR_MIN,
  yearMax: YEAR_MAX,
  mileageMin: 0,
  mileageMax: MILEAGE_MAX,
  priceMin: 0,
  priceMax: PRICE_MAX,
  monthlyBudgetMax: MONTHLY_MAX,
};

export const defaultBudgetSearch: BudgetSearch = {
  monthly: 300,
  deposit: 0,
  term: 48,
};

export const sortOptions: { value: SortOption; label: string }[] = [
  { value: "monthly-asc", label: "Lowest Monthly Payment" },
  { value: "price-asc", label: "Lowest Price" },
  { value: "price-desc", label: "Highest Price" },
  { value: "newest", label: "Newest First" },
  { value: "mileage-asc", label: "Lowest Mileage" },
];

export function getModelsForMakes(makes: string[]): string[] {
  const pool =
    makes.length === 0
      ? vehicles
      : vehicles.filter((vehicle) => makes.includes(vehicle.make));

  return [...new Set(pool.map((vehicle) => vehicle.model))].sort();
}

export function applyStockFilters(
  list: Vehicle[],
  filters: StockFilters,
  budget?: BudgetSearch,
  monthlyMode = false,
): Vehicle[] {
  return list.filter((vehicle) => {
    if (filters.makes.length > 0 && !filters.makes.includes(vehicle.make)) {
      return false;
    }
    if (filters.models.length > 0 && !filters.models.includes(vehicle.model)) {
      return false;
    }
    if (filters.fuelTypes.length > 0 && !filters.fuelTypes.includes(vehicle.fuel)) {
      return false;
    }
    if (
      filters.transmissions.length > 0 &&
      !filters.transmissions.includes(vehicle.transmission)
    ) {
      return false;
    }
    if (vehicle.year < filters.yearMin || vehicle.year > filters.yearMax) return false;
    if (vehicle.mileage < filters.mileageMin || vehicle.mileage > filters.mileageMax) {
      return false;
    }
    if (vehicle.price < filters.priceMin || vehicle.price > filters.priceMax) return false;

    const monthlyCap = monthlyMode && budget ? budget.monthly : filters.monthlyBudgetMax;
    if (vehicle.monthlyHp > monthlyCap) return false;

    return true;
  });
}

export function sortVehicles(list: Vehicle[], sort: SortOption): Vehicle[] {
  const sorted = [...list];

  switch (sort) {
    case "price-asc":
      return sorted.sort((a, b) => a.price - b.price);
    case "price-desc":
      return sorted.sort((a, b) => b.price - a.price);
    case "monthly-asc":
      return sorted.sort((a, b) => a.monthlyHp - b.monthlyHp);
    case "newest":
      return sorted.sort(
        (a, b) => new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime(),
      );
    case "mileage-asc":
      return sorted.sort((a, b) => a.mileage - b.mileage);
    default:
      return sorted;
  }
}

export function countActiveFilters(filters: StockFilters): number {
  let count = 0;
  if (filters.makes.length) count += 1;
  if (filters.models.length) count += 1;
  if (filters.fuelTypes.length) count += 1;
  if (filters.transmissions.length) count += 1;
  if (filters.yearMin > YEAR_MIN || filters.yearMax < YEAR_MAX) count += 1;
  if (filters.mileageMin > 0 || filters.mileageMax < MILEAGE_MAX) count += 1;
  if (filters.priceMin > 0 || filters.priceMax < PRICE_MAX) count += 1;
  if (filters.monthlyBudgetMax < MONTHLY_MAX) count += 1;
  return count;
}

export function getActiveFilterChips(
  filters: StockFilters,
): { key: string; label: string }[] {
  const chips: { key: string; label: string }[] = [];

  filters.makes.forEach((make) => chips.push({ key: `make-${make}`, label: make }));
  filters.models.forEach((model) => chips.push({ key: `model-${model}`, label: model }));
  filters.fuelTypes.forEach((fuel) => chips.push({ key: `fuel-${fuel}`, label: fuel }));
  filters.transmissions.forEach((transmission) =>
    chips.push({ key: `trans-${transmission}`, label: transmission }),
  );

  if (filters.yearMin > YEAR_MIN || filters.yearMax < YEAR_MAX) {
    chips.push({
      key: "year",
      label: `${filters.yearMin}–${filters.yearMax}`,
    });
  }
  if (filters.mileageMin > 0 || filters.mileageMax < MILEAGE_MAX) {
    chips.push({
      key: "mileage",
      label: `Up to ${filters.mileageMax.toLocaleString("en-GB")} mi`,
    });
  }
  if (filters.priceMin > 0 || filters.priceMax < PRICE_MAX) {
    chips.push({
      key: "price",
      label: `£${filters.priceMin.toLocaleString("en-GB")}–£${filters.priceMax.toLocaleString("en-GB")}`,
    });
  }
  if (filters.monthlyBudgetMax < MONTHLY_MAX) {
    chips.push({
      key: "monthly",
      label: `Up to £${filters.monthlyBudgetMax}/mo`,
    });
  }

  return chips;
}
