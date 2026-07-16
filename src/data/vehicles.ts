export type SearchMode = "price" | "monthly";

export type BadgeType = "Hot Deal" | "Just In" | "Low Mileage";

export interface VehicleSpecs {
  engine: string[];
  interior: string[];
  exterior: string[];
  features: string[];
  safety: string[];
  performance: string[];
}

export interface Vehicle {
  id: string;
  make: string;
  model: string;
  year: number;
  registration: string;
  mileage: number;
  fuel: string;
  transmission: string;
  price: number;
  monthlyHp: number;
  apr: number;
  badge: BadgeType;
  images: string[];
  addedAt: string;
  specs: VehicleSpecs;
}


export function formatMileage(value: number): string {
  return `${value.toLocaleString("en-GB")} miles`;
}

const registrations = [
  "BD21 XKZ",
  "CK20 PLM",
  "FP19 TRD",
  "HV22 AMG",
  "GK21 RLN",
  "TY22 HBD",
  "NK20 QSH",
  "KT23 SPT",
  "HN21 TUC",
  "VX20 ELI",
];

function buildSpecs(vehicle: Omit<Vehicle, "specs" | "registration" | "apr">): VehicleSpecs {
  return {
    engine: [
      `${vehicle.fuel} engine`,
      `${vehicle.transmission} gearbox`,
      "Euro 6 compliant",
      "Service history available",
    ],
    interior: [
      "Climate control",
      "Touchscreen infotainment",
      "Bluetooth connectivity",
      "Leather-trim steering wheel",
    ],
    exterior: [
      "Alloy wheels",
      "LED daytime running lights",
      "Parking sensors",
      "Electric mirrors",
    ],
    features: [
      "Apple CarPlay & Android Auto",
      "Cruise control",
      "Keyless start",
      "Reversing camera",
    ],
    safety: [
      "AA inspected",
      "ABS & stability control",
      "Multiple airbags",
      "ISOFIX child seat mounts",
    ],
    performance: [
      `Registered ${vehicle.year}`,
      formatMileage(vehicle.mileage),
      `${vehicle.transmission} transmission`,
      "Ulez compliant where applicable",
    ],
  };
}

function enrichVehicle(
  vehicle: Omit<Vehicle, "specs" | "registration" | "apr">,
  index: number,
): Vehicle {
  return {
    ...vehicle,
    registration: registrations[index] ?? `XX${vehicle.year.toString().slice(-2)} ABC`,
    apr: 9.9,
    specs: buildSpecs(vehicle),
  };
}

const rawVehicles: Omit<Vehicle, "specs" | "registration" | "apr">[] = [
  {
    id: "1",
    make: "BMW",
    model: "320d M Sport",
    year: 2021,
    mileage: 28400,
    fuel: "Diesel",
    transmission: "Automatic",
    price: 18995,
    monthlyHp: 289,
    badge: "Hot Deal",
    images: ["/images/stock/used-car-1.jpg", "/images/stock/used-car-1.jpg"],
    addedAt: "2026-06-20",
  },
  {
    id: "2",
    make: "Audi",
    model: "A3 Sportback",
    year: 2020,
    mileage: 22100,
    fuel: "Petrol",
    transmission: "Manual",
    price: 16450,
    monthlyHp: 249,
    badge: "Low Mileage",
    images: ["/images/stock/used-car-listed-2.jpg", "/images/stock/used-car-listed-2.jpg"],
    addedAt: "2026-06-18",
  },
  {
    id: "3",
    make: "Ford",
    model: "Focus ST-Line",
    year: 2019,
    mileage: 35600,
    fuel: "Petrol",
    transmission: "Manual",
    price: 12995,
    monthlyHp: 199,
    badge: "Hot Deal",
    images: ["/images/stock/used-car-1.jpg", "/images/stock/used-car-listed-2.jpg"],
    addedAt: "2026-06-15",
  },
  {
    id: "4",
    make: "Mercedes-Benz",
    model: "C220d AMG Line",
    year: 2022,
    mileage: 18700,
    fuel: "Diesel",
    transmission: "Automatic",
    price: 22750,
    monthlyHp: 349,
    badge: "Just In",
    images: ["/images/stock/used-car-listed-2.jpg", "/images/stock/used-car-1.jpg"],
    addedAt: "2026-06-22",
  },
  {
    id: "5",
    make: "Volkswagen",
    model: "Golf R-Line",
    year: 2021,
    mileage: 31200,
    fuel: "Petrol",
    transmission: "Automatic",
    price: 17850,
    monthlyHp: 269,
    badge: "Low Mileage",
    images: ["/images/stock/used-car-1.jpg", "/images/stock/used-car-listed-2.jpg"],
    addedAt: "2026-06-12",
  },
  {
    id: "6",
    make: "Toyota",
    model: "Corolla Hybrid",
    year: 2022,
    mileage: 15400,
    fuel: "Hybrid",
    transmission: "Automatic",
    price: 19200,
    monthlyHp: 295,
    badge: "Just In",
    images: ["/images/stock/used-car-listed-2.jpg", "/images/stock/used-car-1.jpg"],
    addedAt: "2026-06-21",
  },
  {
    id: "7",
    make: "Nissan",
    model: "Qashqai Tekna",
    year: 2020,
    mileage: 41800,
    fuel: "Petrol",
    transmission: "Manual",
    price: 14250,
    monthlyHp: 219,
    badge: "Hot Deal",
    images: ["/images/stock/used-car-3.jpg", "/images/stock/used-car-1.jpg"],
    addedAt: "2026-06-10",
  },
  {
    id: "8",
    make: "Kia",
    model: "Sportage GT-Line",
    year: 2023,
    mileage: 9800,
    fuel: "Hybrid",
    transmission: "Automatic",
    price: 24500,
    monthlyHp: 375,
    badge: "Low Mileage",
    images: ["/images/stock/used-car-listed-2.jpg", "/images/stock/used-car-3.jpg"],
    addedAt: "2026-06-19",
  },
  {
    id: "9",
    make: "Hyundai",
    model: "Tucson Premium",
    year: 2021,
    mileage: 27300,
    fuel: "Diesel",
    transmission: "Automatic",
    price: 19995,
    monthlyHp: 305,
    badge: "Just In",
    images: ["/images/stock/used-car-1.jpg", "/images/stock/used-car-3.jpg"],
    addedAt: "2026-06-17",
  },
  {
    id: "10",
    make: "Vauxhall",
    model: "Corsa Elite",
    year: 2020,
    mileage: 33200,
    fuel: "Petrol",
    transmission: "Manual",
    price: 10995,
    monthlyHp: 169,
    badge: "Hot Deal",
    images: ["/images/stock/used-car-3.jpg", "/images/stock/used-car-listed-2.jpg"],
    addedAt: "2026-06-08",
  },
  {
    id: "11",
    make: "Tesla",
    model: "Model 3",
    year: 2022,
    mileage: 21400,
    fuel: "Electric",
    transmission: "Automatic",
    price: 26995,
    monthlyHp: 399,
    badge: "Just In",
    images: ["/images/stock/used-car-listed-2.jpg", "/images/stock/used-car-3.jpg"],
    addedAt: "2026-06-23",
  },
];

export const vehicles: Vehicle[] = rawVehicles.map(enrichVehicle);

export function getVehicleById(id: string): Vehicle | undefined {
  return vehicles.find((vehicle) => vehicle.id === id);
}

export function searchVehicles(query: string, limit = 8): Vehicle[] {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return [];

  return vehicles
    .filter((vehicle) => {
      const label = `${vehicle.make} ${vehicle.model}`.toLowerCase();
      return (
        label.includes(normalized) ||
        vehicle.make.toLowerCase().includes(normalized) ||
        vehicle.model.toLowerCase().includes(normalized)
      );
    })
    .slice(0, limit);
}

export function getRelatedVehicles(vehicle: Vehicle, limit = 6): Vehicle[] {
  return vehicles
    .filter(
      (item) =>
        item.id !== vehicle.id &&
        (item.make === vehicle.make ||
          item.fuel === vehicle.fuel ||
          Math.abs(item.price - vehicle.price) < 4000),
    )
    .slice(0, limit);
}

export function calculateHpMonthly(
  vehiclePrice: number,
  deposit: number,
  termMonths: number,
  apr: number,
): number {
  const principal = Math.max(vehiclePrice - deposit, 0);
  if (termMonths <= 0 || principal <= 0) return 0;

  if (apr === 0) return Math.round(principal / termMonths);

  const monthlyRate = apr / 100 / 12;
  const factor = Math.pow(1 + monthlyRate, termMonths);
  const payment = (principal * monthlyRate * factor) / (factor - 1);

  return Math.round(payment);
}

export const filterOptions = {
  makes: ["BMW", "Audi", "Ford", "Mercedes-Benz", "Volkswagen", "Toyota", "Nissan", "Kia", "Hyundai", "Vauxhall", "Tesla"],
  fuelTypes: ["Petrol", "Diesel", "Hybrid", "Electric"],
  transmissions: ["Manual", "Automatic"],
  years: [2023, 2022, 2021, 2020, 2019],
};

export function formatPrice(value: number): string {
  return `£${value.toLocaleString("en-GB")}`;
}
