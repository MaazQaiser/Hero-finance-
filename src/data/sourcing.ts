export interface SourcedVehicle {
  id: string;
  make: string;
  model: string;
  price: number;
  monthlyHp: number;
  image: string;
  sourcedFor: string;
}

export const sourcedExamples: SourcedVehicle[] = [
  {
    id: "s1",
    make: "BMW",
    model: "X3 M Sport",
    price: 32995,
    monthlyHp: 449,
    image: "/images/car-1.png",
    sourcedFor: "Family SUV · Leeds",
  },
  {
    id: "s2",
    make: "Audi",
    model: "Q5 S Line",
    price: 28750,
    monthlyHp: 399,
    image: "/images/car-2.png",
    sourcedFor: "Executive SUV · Manchester",
  },
  {
    id: "s3",
    make: "Mercedes-Benz",
    model: "A180 AMG Line",
    price: 21450,
    monthlyHp: 319,
    image: "/images/car-4.png",
    sourcedFor: "Premium hatch · Birmingham",
  },
  {
    id: "s4",
    make: "Volkswagen",
    model: "Tiguan R-Line",
    price: 24800,
    monthlyHp: 369,
    image: "/images/car-3.png",
    sourcedFor: "Family crossover · Bristol",
  },
];

export const vehicleTypes = [
  "Hatchback",
  "Saloon",
  "Estate",
  "SUV",
  "Coupe",
  "Convertible",
  "MPV",
  "Van",
  "Not sure yet",
];

export const fuelTypes = ["Petrol", "Diesel", "Hybrid", "Electric", "Any"];
export const transmissions = ["Manual", "Automatic", "Any"];

export function formatPrice(value: number): string {
  return `£${value.toLocaleString("en-GB")}`;
}
