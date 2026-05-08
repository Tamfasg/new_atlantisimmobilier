"use client";

import { M } from "@/components/motion/index";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Building2,
  FolderKanban,
  TrendingUp,
  Newspaper,
  Mail,
} from "lucide-react";
import { useEffect, useState } from "react";

const navLinks = [
  {
    name: "Accueil",
    href: "/",
    icon: Home,
  },
  {
    name: "Le groupe",
    href: "/groupes",
    icon: Building2,
  },
  {
    name: "Nos Projets",
    href: "/project",
    icon: FolderKanban,
  },
  {
    name: "Investir",
    href: "/investir",
    icon: TrendingUp,
  },
  {
    name: "Actualités",
    href: "/actualites",
    icon: Newspaper,
  },
];

const mobileNavLinks = [
  ...navLinks,
  {
    name: "Contact",
    href: "/contact",
    icon: Mail,
    isContact: true,
  },
];

const navTransition = {
  type: "spring" as const,
  stiffness: 520,
  damping: 42,
  mass: 0.6,
};

const Nav = () => {
  const pathname = usePathname();
  const [activeHref, setActiveHref] = useState(pathname);

  useEffect(() => {
    setActiveHref(pathname);
  }, [pathname]);

  const isActiveLink = (href: string) => {
    return activeHref === href || (href !== "/" && activeHref.startsWith(href));
  };

  return (
    <>
      {/* Desktop Nav */}
      <M.nav
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="fixed left-0 top-0 z-50 hidden w-screen select-none font-calibri lg:block"
      >
        <M.div className="mx-auto flex h-24 w-full max-w-[92rem] items-center justify-between px-16">
          <Link
            href="/"
            prefetch
            onClick={() => setActiveHref("/")}
            className="flex items-center"
          >
            <M.image
              src="/logo/navbar-logo/Logo_2.svg"
              alt="Atlantis Immobilier"
              className="pointer-events-none h-12 w-auto object-contain"
            />
          </Link>

          <M.div className="absolute left-1/2 flex -translate-x-1/2 items-center gap-10 text-xl font-semibold text-cream/70">
            {navLinks.map((link) => {
              const active = isActiveLink(link.href);
              const Icon = link.icon;

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  prefetch
                  onClick={() => setActiveHref(link.href)}
                  className={`
                    relative flex cursor-pointer items-center gap-2 pb-2 transition-colors duration-300
                    hover:text-cream
                    ${active ? "text-cream" : "text-cream/70"}
                  `}
                >
                  <Icon size={17} strokeWidth={1.8} />
                  <span>{link.name}</span>

                  {active && (
                    <M.span
                      layoutId="desktop-nav-underline"
                      className="absolute bottom-0 left-0 h-[2px] w-full rounded-full bg-cream will-change-transform"
                      transition={navTransition}
                    />
                  )}
                </Link>
              );
            })}
          </M.div>

          <Link
            href="/contact"
            prefetch
            onClick={() => setActiveHref("/contact")}
            className="
              flex items-center gap-2 rounded-full bg-cream px-7 py-4 uppercase
              text-lg font-bold text-deep shadow-[0_10px_35px_rgba(240,237,230,0.18)]
              transition-all duration-300 hover:scale-105 hover:bg-white
            "
          >
            <Mail size={19} />
            Contact
          </Link>
        </M.div>
      </M.nav>

      {/* Mobile Logo */}
      <M.div
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="fixed left-7 top-10 z-50 lg:hidden"
      >
        <Link href="/" prefetch onClick={() => setActiveHref("/")}>
          <M.image
            src="/logo/navbar-logo/Logo_2.svg"
            alt="Atlantis Immobilier"
            className="pointer-events-none h-12 w-auto object-contain"
          />
        </Link>
      </M.div>

      {/* Mobile Bottom Nav */}
      <M.nav
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        className="fixed bottom-6 left-0 z-50 flex w-screen justify-center px-4 font-calibri lg:hidden"
      >
        <M.div
          className="
            flex h-18 w-full max-w-[22rem] items-center justify-between
            rounded-[1.8rem] border border-white/10
            bg-deep px-3 shadow-[0_20px_45px_rgba(0,0,0,0.35)]
            backdrop-blur-xl
          "
        >
          {mobileNavLinks.map((link) => {
  const active = isActiveLink(link.href);
  const Icon = link.icon;
  const isContact = "isContact" in link && link.isContact;

  return (
    <Link
      key={link.name}
      href={link.href}
      prefetch
      onClick={() => setActiveHref(link.href)}
      className={`
        relative flex h-12 items-center justify-center rounded-full
        transition-[color,flex] duration-300
        ${active ? "flex-[2.1] gap-2" : "flex-1"}
        ${
          active
            ? isContact
              ? "text-gold-muted"
              : "text-deep"
            : isContact
              ? "text-gold-muted hover:bg-[#d6c7a3]/10"
              : "text-cream hover:bg-white/10 hover:text-cream"
        }
      `}
    >
      {active && (
        <M.span
          layoutId="mobile-active-bg"
          className={`
            absolute inset-0 rounded-2xl will-change-transform px-8
            ${
              isContact
                ? "bg-cream/90 shadow-[0_8px_18px_rgba(214,199,163,0.2)]"
                : "bg-cream shadow-[0_8px_18px_rgba(240,237,230,0.16)]"
            }
          `}
          transition={navTransition}
        />
      )}

      <span className="relative z-10 flex items-center justify-center">
        <Icon size={21} strokeWidth={1.9} />
      </span>

      {active && (
        <M.span
          initial={{ opacity: 0, x: -6 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="relative z-10 text-sm font-calibri font-semibold"
        >
          {link.name === "Nos Projets" ? "Projets" : link.name === "Le groupe" ? "Groupe"  : link.name}
        </M.span>
      )}
    </Link>
  );
})}
        </M.div>
      </M.nav>
    </>
  );
};

export default Nav;
