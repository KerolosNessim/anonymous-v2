import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/features/shared/components/navbar";
import Footer from "@/features/shared/components/footer";
import StatusHero from "@/features/shared/components/status-hero";

export const metadata: Metadata = {
  title: "Page not found | Anonymous",
};

// Unknown URLs render outside the (public) layout, so the navbar and footer are added here.
export default function NotFound() {
  return (
    <>
      <Navbar />
      <main>
        <StatusHero
          display="404"
          title="Page not found"
          description="We couldn't find the page you're looking for. It might have been moved, deleted, or the link you followed may be broken."
        >
          <Link
            href="/"
            className="custom-btn inline-flex rounded-full px-8 py-3 text-base font-bold text-dark-blue"
          >
            Back to home
          </Link>
        </StatusHero>
      </main>
      <Footer />
    </>
  );
}
