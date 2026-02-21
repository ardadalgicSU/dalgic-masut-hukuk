"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Phone, X, Mail } from "lucide-react";
import clsx from "clsx";
import { ContactInfo, FirmInfo, NavigationItem } from "@/lib/types";

type HeaderProps = {
  firm: FirmInfo;
  contact?: ContactInfo;
  navigation: NavigationItem[];
};

const sanitizeTel = (phone?: string) => {
  if (!phone) {
    return undefined;
  }

  return phone.replace(/[^+\d]/g, "");
};

const Header = ({ firm, contact, navigation }: HeaderProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen((prev) => !prev);

  const phoneHref = sanitizeTel(contact?.phone);
  const emailHref = contact?.email ? `mailto:${contact.email}` : undefined;

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Üst bilgi şeridi — sadece sayfanın tepesinde görünür */}
      <div
        className={clsx(
          "overflow-hidden bg-gray-100 border-b border-gray-200 text-gray-600 transition-all duration-300",
          scrolled ? "max-h-0 opacity-0 border-b-0" : "max-h-10 opacity-100",
        )}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 text-xs">
          <div className="flex items-center gap-6">
            {phoneHref && contact?.phone && (
              <Link
                href={`tel:${phoneHref}`}
                className="flex items-center gap-1.5 transition-colors hover:text-brand"
              >
                <Phone size={12} aria-hidden="true" />
                <span>{contact.phone}</span>
              </Link>
            )}
            {emailHref && contact?.email && (
              <Link
                href={emailHref}
                className="hidden items-center gap-1.5 transition-colors hover:text-brand md:flex"
              >
                <Mail size={12} aria-hidden="true" />
                <span>{contact.email}</span>
              </Link>
            )}
          </div>
          {contact?.workingHours && (
            <span className="hidden md:block text-gray-400">{contact.workingHours}</span>
          )}
        </div>
      </div>

      {/* Ana header */}
      <div
        className={clsx(
          "transition-all duration-300",
          scrolled
            ? "bg-white/95 shadow-lg shadow-black/5 backdrop-blur-md border-b border-gray-100"
            : "bg-white border-b border-gray-100",
        )}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          {/* Logo */}
          <Link href="/" className="group flex items-center gap-3">
            <div className="relative h-11 w-11 overflow-hidden rounded-xl">
              <Image
                src="/logo.png"
                alt={`${firm.name} logosu`}
                fill
                className="object-contain transition-transform group-hover:scale-105"
                priority
              />
            </div>
            <div>
              <p className="font-heading text-base leading-tight text-gray-900 group-hover:text-brand transition-colors">
                Dalgıç-Masüt
              </p>
              <p className="text-xs text-gray-500">Hukuk Bürosu</p>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 md:flex">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={clsx(
                  "relative rounded-lg px-3 py-2 text-sm font-medium transition-colors whitespace-nowrap",
                  pathname === item.href
                    ? "text-brand bg-brand/5"
                    : "text-gray-600 hover:text-brand hover:bg-gray-50",
                )}
              >
                {item.label}
                {pathname === item.href && (
                  <span className="absolute bottom-0 left-1/2 h-0.5 w-4 -translate-x-1/2 rounded-full bg-brand" />
                )}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3 shrink-0">
            {phoneHref && contact?.phone && (
              <Link
                href={`tel:${phoneHref}`}
                className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-brand transition-colors whitespace-nowrap"
              >
                <Phone size={16} className="shrink-0" />
                <span className="hidden lg:block whitespace-nowrap">{contact.phone}</span>
              </Link>
            )}
            <Link
              href="/iletisim"
              className="whitespace-nowrap rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-brand/20 transition-all hover:bg-brand-dark hover:shadow-brand/30 hover:-translate-y-0.5"
            >
              Randevu Oluşturun
            </Link>
          </div>

          {/* Mobil menü butonu */}
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 text-gray-700 transition hover:bg-gray-50 md:hidden"
            onClick={toggleMenu}
            aria-label="Menüyü aç"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobil menü */}
        {isOpen && (
          <div className="border-t border-gray-100 bg-white px-4 pb-6 pt-2 md:hidden">
            <nav className="flex flex-col gap-1">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={clsx(
                    "rounded-xl px-4 py-3 text-sm font-medium transition-colors",
                    pathname === item.href
                      ? "bg-brand/10 text-brand"
                      : "text-gray-600 hover:bg-gray-50 hover:text-brand",
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="mt-4 flex flex-col gap-2">
              {phoneHref && contact?.phone && (
                <Link
                  href={`tel:${phoneHref}`}
                  className="flex items-center justify-center gap-2 rounded-xl border border-brand/30 py-3 text-sm font-medium text-brand"
                  onClick={() => setIsOpen(false)}
                >
                  <Phone size={16} />
                  {contact.phone}
                </Link>
              )}
              <Link
                href="/iletisim"
                className="rounded-xl bg-brand py-3 text-center text-sm font-semibold text-white"
                onClick={() => setIsOpen(false)}
              >
                Randevu Oluşturun
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
