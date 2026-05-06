"use client";

import { M } from "@/components/motion/index";
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
import { create } from "zustand";

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

interface ScrollStore {
  Scrolling: boolean;
  setIsScrolling: (scrolling: boolean) => void;
}

const useScrollStore = create<ScrollStore>((set) => ({
  Scrolling: false,
  setIsScrolling: (scrolling: boolean) => set({ Scrolling: scrolling }),
}));

const Nav = () => {
  const { setIsScrolling, Scrolling } = useScrollStore();
  const pathname = usePathname();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      const current = window.scrollY;
      if (current > lastScrollY && current > 50) {
        setVisible(false);
      } else if (current < lastScrollY) {
        setVisible(true);
      }
      lastScrollY = current;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActiveLink = (href: string) => {
    return pathname === href || (href !== "/" && pathname.startsWith(href));
  };

  return (
    <M.nav
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.8, ease: "easeIn", opacity: { duration: 0.5 } }}
      className="fixed left-0 top-0 z-50 w-screen select-none font-calibri"
    >
      <M.nav
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="fixed left-0 top-0 z-50 hidden w-screen select-none font-calibri lg:block"
      >
        <M.div className="mx-auto flex h-24 w-full max-w-[92rem] items-center justify-between px-16">
          <M.a href="/" className="flex items-center">
            <M.image
              src="/logo/navbar-logo/Logo_2.svg"
              alt="Atlantis Immobilier"
              className="h-12 w-auto object-contain pointer-events-none"
            />
          </M.a>
          <M.div className="absolute left-1/2 flex -translate-x-1/2 items-center gap-10 text-xl font-semibold text-cream/70">
            {navLinks.map((link) => {
              const active = isActiveLink(link.href);
              const Icon = link.icon;

              return (
                <M.a
                  key={link.name}
                  href={link.href}
                  className={`
                    relative flex cursor-pointer items-center gap-2 transition-all duration-300
                    hover:text-cream
                    ${
                      active
                        ? "text-cream after:absolute after:-bottom-2 after:left-0 after:h-[2px] after:w-full after:rounded-full after:bg-cream"
                        : "after:absolute after:-bottom-2 after:left-0 after:h-[2px] after:w-0 after:rounded-full after:bg-cream after:transition-all after:duration-300 hover:after:w-full"
                    }
                  `}
                >
                  <Icon size={17} strokeWidth={1.8} />
                  <span>{link.name}</span>
                </M.a>
              );
            })}
          </M.div>

          <M.a
            href="/contact"
            className="
              flex items-center gap-2 rounded-full bg-cream px-7 py-4 uppercase
              text-lg font-bold text-deep shadow-[0_10px_35px_rgba(240,237,230,0.18)]
              transition-all duration-400 hover:scale-105 hover:bg-white
            "
          >
            <Mail size={19} />
            Contact
          </M.a>
        </M.div>
      </M.nav>

        <M.div className="w-screen absolute top-10 left-7 lg:hidden">
          <M.image
            src="/logo/navbar-logo/Logo_2.svg"
            alt="Atlantis Immobilier"
            className="h-12 w-auto object-contain pointer-events-none"
          />
        </M.div>
      <M.nav
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        className="fixed bottom-6 left-0 z-50 flex w-screen justify-center px-4 font-calibri lg:hidden"
      >
        <M.div
          className="
            flex h-18 w-full max-w-[24rem] items-center justify-between
            rounded-[1.8rem] border border-white/10
            bg-deep px-3 shadow-[0_20px_60px_rgba(0,0,0,0.45)]
            backdrop-blur-2xl
          "
        >
          {navLinks.map((link) => {
            const active = isActiveLink(link.href);
            const Icon = link.icon;

            return (
              <M.a
                key={link.name}
                href={link.href}
                className={`
                  flex h-12 items-center justify-center rounded-full transition-all duration-300
                  ${
                    active
                      ? "w-32 gap-2 bg-cream text-deep shadow-[0_8px_25px_rgba(240,237,230,0.2)]"
                      : "w-12 text-cream/80 hover:bg-white/10 hover:text-cream"
                  }
                `}
              >
                <Icon size={21} strokeWidth={1.9} />

                {active && (
                  <M.span
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    className="text-lg font-semibold"
                  >
                    {link.name === "Nos Projets" ? "Projets" : link.name}
                  </M.span>
                )}
              </M.a>
            );
          })}
        </M.div>
      </M.nav>
    </M.nav>
  );
};

export default Nav;
