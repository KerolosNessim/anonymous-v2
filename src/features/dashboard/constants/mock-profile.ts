import type { Profile } from "../types";

// Mock profile. Replace with the signed-in user's profile from the API.
export const mockProfile: Profile = {
  firstName: "Karim",
  lastName: "Gomaa",
  email: "karim.gomaa@example.com",
  phone: "+201012345678",
  company: "Anonymous Defenders",
  jobTitle: "Security Analyst",
  experience: "3 to 5 years",
  plan: "Pro",
  memberSince: "2026-03-14",
  preferences: { analysis: true, threats: true, billing: false },
};
