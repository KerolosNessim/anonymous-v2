"use client";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import AuthLinks from "./auth-links";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

const NavLinks = [
  {
    label: "Home",
    path: "/",
  },
  {
    label: "About Us",
    path: "/about",
  },
  {
    label: "Services",
    path: "/services",
  },
  {
    label: "Blogs",
    path: "/blogs",
  },
  {
    label: "Contact Us",
    path: "/contact",
  },
]
export default function Navbar() {
  const pathname = usePathname()
  return (
    <motion.nav
      initial={{
        y: -100,
        opacity: 0,
      }}
      animate={{
        y: 0,
        opacity: 1,
      }}
      viewport={{
        once: true,
      }}
      transition={{
        duration: 1,
      }}
      className="flex items-center justify-between backdrop-blur-2xl bg-white/10 container py-3 px-3 lg:px-8 rounded-full fixed top-6 z-10 inset-x-1/2 -translate-x-1/2"
    >
      {/* logo */}
      <Link href={"/"}>
        <Image
          src={"/images/logo.png"}
          alt="logo"
          width={100}
          height={100}
          className="w-30 object-contain"
        />
      </Link>

      {/* nav links */}
      <ul className=" flex items-center gap-8 max-lg:hidden">
        {NavLinks.map((link, index) => {
          return (
            <li key={index}>
              <Link
                className={`text-lg  hover:text-custom-primary  transition-all duration-300 ${pathname === link.path ? "text-custom-primary font-bold" : "text-white"}`}
                href={link.path}
              >
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>

      {/* auth links */}
      <div className="max-lg:hidden">
        <AuthLinks />
      </div>

      {/* sheet for responsive */}

      <Sheet>
        <SheetTrigger className="lg:hidden cursor-pointer size-10 bg-custom-primary rounded-full flex items-center justify-center">
          <Menu className="text-dark-blue  " />
        </SheetTrigger>
        <SheetContent
          showCloseButton={false}
          side="right"
          className="bg-white/10 backdrop-blur-lg border-none! rounded-s-3xl "
        >
          <SheetHeader>
            <SheetTitle className="mt-8">
              <Image
                src={"/images/logo.png"}
                alt="logo"
                width={100}
                height={100}
                className="w-60 object-contain mx-auto"
              />
            </SheetTitle>
          </SheetHeader>

          <div className="flex flex-col items-center gap-6 text-sm text-muted-foreground">
            <ul className=" flex flex-col items-center gap-6">
              {NavLinks.map((link, index) => {
                return (
                  <li key={index}>
                    <Link
                      className={`text-lg  hover:text-custom-primary  transition-all duration-300 ${pathname === link.path ? "text-custom-primary font-bold" : "text-white"}`}
                      href={link.path}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>

            <AuthLinks />
          </div>
        </SheetContent>
      </Sheet>
    </motion.nav>
  );
}
