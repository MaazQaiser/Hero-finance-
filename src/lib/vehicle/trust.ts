import { type Vehicle } from "@/data/vehicles";
import { vehicleTrustContent } from "@/config/vehicleTrustContent";

export function isEvOrHybrid(vehicle: Pick<Vehicle, "fuel">): boolean {
  return /electric|ev|hybrid/i.test(vehicle.fuel);
}

export interface VehicleTrustItem {
  id: string;
  label: string;
}

export function getVehicleTrustItems(vehicle: Pick<Vehicle, "fuel">): VehicleTrustItem[] {
  const items: VehicleTrustItem[] = [
    { id: "aa", label: vehicleTrustContent.trustItems.aaInspection },
    { id: "ready", label: vehicleTrustContent.trustItems.readyToDrive },
    { id: "delivery", label: vehicleTrustContent.trustItems.freeDelivery },
  ];

  if (isEvOrHybrid(vehicle)) {
    items.push({ id: "battery", label: vehicleTrustContent.trustItems.batteryHealth });
  }

  return items;
}
