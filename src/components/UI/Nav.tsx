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
import { memo, useEffect, useMemo, useRef, useState } from "react";

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
  stiffness: 360,
  damping: 34,
  mass: 0.55,
};

const desktopNavVariants = {
  hidden: {
    opacity: 0,
    y: -34,
    scale: 0.985,
    filter: "blur(14px)",
    pointerEvents: "none" as const,
  },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    pointerEvents: "auto" as const,
    transition: {
      type: "spring" as const,
      stiffness: 140,
      damping: 22,
      mass: 0.8,
      staggerChildren: 0.045,
      delayChildren: 0.08,
    },
  },
  hideOnScroll: {
    opacity: 0,
    y: -34,
    scale: 0.985,
    filter: "blur(10px)",
    pointerEvents: "none" as const,
    transition: {
      type: "spring" as const,
      stiffness: 170,
      damping: 24,
      mass: 0.8,
    },
  },
};

const desktopItemVariants = {
  hidden: {
    opacity: 0,
    y: 10,
    filter: "blur(8px)",
  },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.42,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
  hideOnScroll: {
    opacity: 0,
    y: -6,
    filter: "blur(6px)",
    transition: {
      duration: 0.22,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

const mobileLogoVariants = {
  hidden: {
    y: -28,
    opacity: 0,
    scale: 0.94,
    filter: "blur(14px)",
    pointerEvents: "none" as const,
  },
  show: {
    y: 0,
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    pointerEvents: "auto" as const,
    transition: {
      type: "spring" as const,
      stiffness: 150,
      damping: 22,
      mass: 0.75,
    },
  },
  hideOnScroll: {
    y: -28,
    opacity: 0,
    scale: 0.94,
    filter: "blur(10px)",
    pointerEvents: "none" as const,
    transition: {
      type: "spring" as const,
      stiffness: 170,
      damping: 24,
      mass: 0.75,
    },
  },
};

const mobileNavVariants = {
  hidden: {
    y: 70,
    opacity: 0,
    scale: 0.9,
    filter: "blur(18px)",
    pointerEvents: "none" as const,
  },
  show: {
    y: 0,
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    pointerEvents: "auto" as const,
    transition: {
      type: "spring" as const,
      stiffness: 145,
      damping: 21,
      mass: 0.85,
      delay: 0.03,
    },
  },
  hideOnScroll: {
    y: 70,
    opacity: 0,
    scale: 0.9,
    filter: "blur(14px)",
    pointerEvents: "none" as const,
    transition: {
      type: "spring" as const,
      stiffness: 170,
      damping: 24,
      mass: 0.85,
    },
  },
};

const getMobileTitle = (name: string) => {
  if (name === "Nos Projets") return "Projets";
  if (name === "Le groupe") return "Groupe";
  return name;
};

const Nav = () => {
  const pathname = usePathname();

  const [isNavVisible, setIsNavVisible] = useState(true);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    setIsNavVisible(true);
    lastScrollY.current = window.scrollY;
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      if (ticking.current) return;

      ticking.current = true;

      window.requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;
        const scrollDifference = currentScrollY - lastScrollY.current;

        if (currentScrollY < 40) {
          setIsNavVisible(true);
        } else if (scrollDifference > 8) {
          setIsNavVisible(false);
        } else if (scrollDifference < -8) {
          setIsNavVisible(true);
        }

        lastScrollY.current = currentScrollY;
        ticking.current = false;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const activeHref = useMemo(() => {
    const active = mobileNavLinks.find((link) => {
      if (link.href === "/") return pathname === "/";
      return pathname.startsWith(link.href);
    });

    return active?.href ?? "/";
  }, [pathname]);

  const isActiveLink = (href: string) => activeHref === href;

  return (
    <>
      {/* Desktop Nav */}
      <M.nav
        key={`desktop-nav-${pathname}`}
        variants={desktopNavVariants}
        initial="hidden"
        animate={isNavVisible ? "show" : "hideOnScroll"}
        className="fixed left-0 top-0 z-50 hidden w-screen select-none font-calibri lg:block nav-gpu"
      >
        <div className="mx-auto flex h-24 w-full max-w-[92rem] items-center justify-between px-16">
          <M.div variants={desktopItemVariants}>
            <Link href="/" prefetch className="flex items-center">
              <M.image
                src="/logo/navbar-logo/Logo_2.svg"
                alt="Atlantis Immobilier"
                className="pointer-events-none h-12 w-auto object-contain"
                draggable={false}
              />
            </Link>
          </M.div>

          <div className="absolute left-1/2 flex -translate-x-1/2 items-center gap-10 text-xl font-semibold text-cream/70">
            {navLinks.map((link) => {
              const active = isActiveLink(link.href);
              const Icon = link.icon;

              return (
                <M.div key={link.name} variants={desktopItemVariants}>
                  <Link
                    href={link.href}
                    prefetch
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
                        className="absolute bottom-0 left-0 h-[2px] w-full rounded-full bg-cream"
                        transition={navTransition}
                      />
                    )}
                  </Link>
                </M.div>
              );
            })}
          </div>

          <M.div variants={desktopItemVariants}>
            <Link
              href="/contact"
              prefetch
              className="
                flex items-center gap-2 rounded-full bg-cream px-7 py-4 uppercase
                text-lg font-bold text-deep shadow-[0_10px_35px_rgba(240,237,230,0.18)]
                transition-transform duration-300 hover:scale-[1.03] hover:bg-white
              "
            >
              <Mail size={19} />
              Contact
            </Link>
          </M.div>
        </div>
      </M.nav>

      {/* Mobile Logo */}
      <div className="fixed left-7 top-10 z-50 lg:hidden">
        <M.div
          key={`mobile-logo-animation-${pathname}`}
          variants={mobileLogoVariants}
          initial="hidden"
          animate={isNavVisible ? "show" : "hideOnScroll"}
          className="nav-gpu"
        >
          <Link href="/" prefetch>
            <M.image
              src="/logo/navbar-logo/Logo_2.svg"
              alt="Atlantis Immobilier"
              className="pointer-events-none h-12 w-auto object-contain"
              draggable={false}
            />
          </Link>
        </M.div>
      </div>

      {/* Mobile Bottom Nav */}
      <nav className="fixed bottom-6 left-0 z-50 flex w-screen justify-center px-4 font-calibri lg:hidden pointer-events-none">
        <M.div
          key={`mobile-nav-animation-${pathname}`}
          variants={mobileNavVariants}
          initial="hidden"
          animate={isNavVisible ? "show" : "hideOnScroll"}
          className="
            nav-gpu flex h-18 w-full max-w-[22rem] items-center justify-between
            rounded-[1.8rem] border border-white/10
            bg-deep px-3 shadow-[0_20px_45px_rgba(0,0,0,0.35)]
            backdrop-blur-xl
          "
        >
          {mobileNavLinks.map((link, index) => {
            const active = isActiveLink(link.href);
            const Icon = link.icon;
            const isContact = "isContact" in link && link.isContact;

            return (
              <M.div
                key={`${link.name}-${pathname}`}
                initial={{ opacity: 0, y: 16, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{
                  duration: 0.42,
                  delay: 0.08 + index * 0.045,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={`
                  h-12 transition-[flex] duration-500 ease-out
                  ${active ? "flex-[2.1]" : "flex-1"}
                `}
              >
                <Link
                  href={link.href}
                  prefetch
                  className={`
                    relative flex h-12 w-full items-center justify-center rounded-full
                    transition-colors duration-300 ease-out
                    ${active ? "gap-2" : ""}
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
                        absolute inset-0 rounded-2xl px-8
                        ${
                          isContact
                            ? "bg-cream border-2 shadow-[0_8px_18px_rgba(214,199,163,0.2)]"
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
                      key={`mobile-title-${activeHref}`}
                      initial={{
                        opacity: 0,
                        x: -8,
                        filter: "blur(6px)",
                      }}
                      animate={{
                        opacity: 1,
                        x: 0,
                        filter: "blur(0px)",
                      }}
                      transition={{
                        duration: 0.34,
                        delay: 0.16,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="relative z-10 whitespace-nowrap text-sm font-calibri font-semibold"
                    >
                      {getMobileTitle(link.name)}
                    </M.span>
                  )}
                </Link>
              </M.div>
            );
          })}
        </M.div>
      </nav>
    </>
  );
};

export default memo(Nav);