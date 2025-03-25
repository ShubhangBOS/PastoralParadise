import { Globe, ChevronUp } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function Footer() {
  const links = [
    "privacy",
    "terms",
    "sitemap",
    "company details",
    "destinations",
  ];
  return (
    <div className="px-20 border-t border-t-gray-200 py-4 flex justify-between w-full text-sm z-50 bg-white items-center ">
      <ul className="flex gap-3 font-normal">
        <li>&copy; {new Date().getFullYear()} Pastoral Paradise, Inc</li>
        {links.map((link) => (
          <li key={link}>
            <Link href="#" className="capitalize">
              {link}
            </Link>
          </li>
        ))}
      </ul>
      <ul className="flex gap-4 font-medium items-center">
        <li className="flex items-center gap-2 cursor-pointer">
          <Globe /> English (IN)
        </li>
        <li className="cursor-pointer">&#8377; INR</li>
        <li className="flex items-center gap-2 cursor-pointer">
          Support & Resources <ChevronUp />{" "}
        </li>
      </ul>
    </div>
  );
}
