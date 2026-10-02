"use client";

import { motion } from "motion/react";
import PasswordForm from "./password-form";
import PersonalInfoForm from "./personal-info-form";
import PreferencesCard from "./preferences-card";
import ProfileSummary from "./profile-summary";

const rise = (delay: number) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, delay },
});

export default function ProfilePage() {
  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold md:text-3xl">Profile</h1>
        <p className="text-sm text-muted-foreground md:text-base">Your personal details, password and email settings.</p>
      </div>

      <div className="grid items-start gap-6 lg:grid-cols-[18rem_1fr]">
        <motion.div {...rise(0)} className="lg:sticky lg:top-24">
          <ProfileSummary />
        </motion.div>

        <div className="min-w-0 space-y-6">
          <motion.div {...rise(0.08)}>
            <PersonalInfoForm />
          </motion.div>
          <motion.div {...rise(0.16)}>
            <PasswordForm />
          </motion.div>
          <motion.div {...rise(0.24)}>
            <PreferencesCard />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
