import Image from "next/image";
import Link from "next/link";
import { Mail, Phone, Globe } from "lucide-react";
import { FaLinkedinIn, FaInstagram } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa6";


const contactLinks = [
  {
    label: "karimM.Gomaa@outlook.com",
    href: "mailto:karimM.Gomaa@outlook.com",
    Icon: Mail,
  },
  {
    label: "anonymous-frontend-l5z5.vercel.app",
    href: "https://anonymous-frontend-l5z5.vercel.app",
    Icon: Globe,
  },
  {
    label: "0201002264114",
    href: "tel:0201002264114",
    Icon: Phone,
  },
];

const socialLinks = [
  {
    label: "LinkedIn",
    href: "#",
    Icon: FaLinkedinIn,
    className: "text-[#0A66C2]",
  },
  {
    label: "Instagram",
    href: "#",
    Icon: FaInstagram,
    className: "text-[#E1306C]",
  },
  {
    label: "Facebook",
    href: "#",
    Icon: FaFacebookF,
    className: "text-[#1877F2]",
  },
];

export default function Footer() {
  return (
    <footer className="container border-t border-custom-primary/30 py-10">
      <div className="grid grid-cols-1 gap-12 pb-8 md:grid-cols-2 lg:grid-cols-3">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Image className="w-full object-contain" src="/images/logo.svg" alt="Anonymous Defenders" width={56} height={56} />
          </div>
          <p className="max-w-lg text-sm leading-7 text-gray-400">
            Next-generation threat detection powered by artificial intelligence.
            Anonymous scans, analyzes, neutralizes sophisticated malware that
            traditional security misses. Upload a file and get your free analysis
            in seconds.
          </p>
        </div>

        <div className="space-y-4">
          <h3 className="text-4xl font-bold text-custom-primary">Contact US</h3>
          <div className="space-y-3">
            {contactLinks.map(({ label, href, Icon }) => (
              <Link
                key={label}
                href={href}
                className="flex items-center gap-3 text-lg text-gray-200 transition-colors hover:text-custom-primary"
              >
                <Icon className="size-5 text-custom-primary" />
                <span>{label}</span>
              </Link>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-4xl font-bold text-custom-primary">Follow Us</h3>
          <p className="text-lg text-gray-400">Don&apos;t Miss US</p>
          <div className="flex items-center gap-4">
            {socialLinks.map(({ label, href, Icon, className }) => (
              <Link
                key={label}
                href={href}
                aria-label={label}
                className="inline-flex size-9 items-center justify-center overflow-hidden transition-opacity hover:opacity-80"
              >
                <Icon className={`size-7 ${className}`} />
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4 border-t border-custom-primary/30 pt-6 text-sm font-semibold md:flex-row md:items-center md:justify-between">
        <p className="text-gray-300">Copyright © 2025 All Rights Reserved</p>
        <div className="flex items-center gap-6">
          <Link href="#" className="text-custom-primary underline underline-offset-2">
            Privacy Policy
          </Link>
          <Link href="#" className="text-custom-primary underline underline-offset-2">
            Terms & Conditions
          </Link>
        </div>
      </div>
    </footer>
  );
}
