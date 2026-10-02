import { mockProfile } from "../constants/mock-profile";
import type { NotificationPreferences, Profile } from "../types";
import type { PasswordValues, ProfileValues } from "../types/profile-schema";

// Mock data access. Replace each body with a request to the API; callers stay the same.
const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function getProfile(): Promise<Profile> {
  return mockProfile;
}

export async function saveProfile(values: ProfileValues): Promise<void> {
  void values;
  await wait(900);
}

export async function changePassword(values: PasswordValues): Promise<void> {
  void values;
  await wait(900);
}

export async function savePreferences(preferences: NotificationPreferences): Promise<void> {
  void preferences;
  await wait(400);
}
