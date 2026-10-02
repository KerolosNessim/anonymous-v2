import { Mail, Phone, Globe } from "lucide-react";
import { FaLinkedinIn, FaInstagram } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa6";
import type { ContactLink, SocialLink } from "../types";

export const contactLinks: ContactLink[] = [
  {
    title: "Email Address",
    label: "karimM.Gomaa@outlook.com",
    href: "mailto:karimM.Gomaa@outlook.com",
    Icon: Mail,
  },
  {
    title: "Website",
    label: "anonymous-frontend-l5z5.vercel.app",
    href: "https://anonymous-frontend-l5z5.vercel.app",
    Icon: Globe,
  },
  {
    title: "Phone Number",
    label: "0201002264114",
    href: "tel:0201002264114",
    Icon: Phone,
  },
];

export const socialLinks: SocialLink[] = [
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
