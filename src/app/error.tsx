"use client";

import { useEffect } from "react";
import Link from "next/link";
import Navbar from "@/features/shared/components/navbar";
import Footer from "@/features/shared/components/footer";
import StatusHero from "@/features/shared/components/status-hero";

// An error here replaces the (public) layout, so the navbar and footer are added again.
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <>
      <Navbar />
      <main>
        <StatusHero
          display="Oops!"
          title="Something went wrong"
          description="An unexpected error stopped this page from loading. Try again, or head back to the home page."
        >
          <button
            type="button"
            onClick={reset}
            className="custom-btn inline-flex cursor-pointer rounded-full px-8 py-3 text-base font-bold text-dark-blue"
          >
            Try again
          </button>
          <Link
            href="/"
            className="inline-flex rounded-full border-2 border-custom-primary px-8 py-2.5 text-base font-bold text-custom-primary transition-colors duration-300 hover:bg-custom-primary hover:text-dark-blue"
          >
            Back to home
          </Link>
        </StatusHero>
      </main>
      <Footer />
    </>
  );
}
