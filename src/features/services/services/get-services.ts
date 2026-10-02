import { services } from "@/features/shared/constants/services";
import { serviceDetails } from "../constants/service-details";
import type { ServiceWithDetail } from "../types";

// Mock data access. Swap the body for a fetch when an API exists; callers stay the same.
function merge(): ServiceWithDetail[] {
  return services.flatMap((service) => {
    const detail = serviceDetails.find((d) => d.slug === service.slug);
    return detail ? [{ ...service, ...detail }] : [];
  });
}

export async function getServices(): Promise<ServiceWithDetail[]> {
  return merge();
}

export async function getServiceBySlug(slug: string): Promise<ServiceWithDetail | undefined> {
  return merge().find((service) => service.slug === slug);
}
