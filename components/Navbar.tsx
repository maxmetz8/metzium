"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import MetziumLogo from "@/images/metzium logo png colour 2.png";
import { logoutAction } from "@/app/logout/actions";

const NAV_LINKS = [
  { href: "/#home", label: "Home", id: "home" },
  { href: "/#services", label: "Services", id: "services" },
  { href: "/#featured-projects", label: "Projects", id: "featured-projects" },
  { href: "/#about", label: "About", id: "about" },
  { href: "/contact", label: "Contact Us", id: "contact" },
];

type NavbarProps = {
  userName: string | null;
  userEmail: string | null;
  isAdmin: boolean;
};

export default function Navbar({ userName, userEmail, isAdmin }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isLogoutConfirmOpen, setIsLogoutConfirmOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("home");
  const userMenuRef = useRef<HTMLDivElement | null>(null);
  const desktopLinkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const [sliderStyle, setSliderStyle] = useState({
    left: 0,
    width: 0,
    visible: false,
  });
  const pathname = usePathname();
  const displayActiveLink =
    pathname === "/"
      ? activeLink
      : pathname.startsWith("/contact")
        ? "contact"
        : "";
  const isLoggedIn = Boolean(userName);
  const userInitial = (userName?.trim().charAt(0) || userEmail?.trim().charAt(0) || "U").toUpperCase();

  useEffect(() => {
    if (pathname !== "/") {
      return;
    }

    const observerOptions = {
      root: null,
      rootMargin: "-50% 0px -50% 0px",
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          const matchingLink = NAV_LINKS.find((link) => link.id === sectionId);
          if (matchingLink) {
            setActiveLink(matchingLink.id);
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    NAV_LINKS.forEach((link) => {
      const element = document.getElementById(link.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [pathname]);

  useEffect(() => {
    if (!isUserMenuOpen) {
      return;
    }

    const onPointerDown = (event: MouseEvent) => {
      if (!userMenuRef.current?.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", onPointerDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
    };
  }, [isUserMenuOpen]);

  useEffect(() => {
    const updateSliderPosition = () => {
      if (!displayActiveLink) {
        setSliderStyle((previous) => ({ ...previous, visible: false }));
        return;
      }

      const activeElement = desktopLinkRefs.current[displayActiveLink];
      if (!activeElement) {
        setSliderStyle((previous) => ({ ...previous, visible: false }));
        return;
      }

      setSliderStyle({
        left: activeElement.offsetLeft,
        width: activeElement.offsetWidth,
        visible: true,
      });
    };

    updateSliderPosition();
    window.addEventListener("resize", updateSliderPosition);
    return () => {
      window.removeEventListener("resize", updateSliderPosition);
    };
  }, [displayActiveLink]);

  useEffect(() => {
    if (!isLogoutConfirmOpen) {
      return;
    }

    const onEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsLogoutConfirmOpen(false);
      }
    };

    document.addEventListener("keydown", onEscape);
    return () => {
      document.removeEventListener("keydown", onEscape);
    };
  }, [isLogoutConfirmOpen]);

  const handleLinkClick = (link: string) => {
    setActiveLink(link);
    setIsOpen(false);
  };

  const openLogoutConfirm = () => {
    setIsOpen(false);
    setIsUserMenuOpen(false);
    setIsLogoutConfirmOpen(true);
  };

  return (
    <>
      <div className="fixed top-6 left-6 z-50 flex items-center md:top-12 md:left-12">
        <Link href="/" className="flex items-center">
          <div className="relative h-6 w-24 md:h-8 md:w-32">
            <Image src={MetziumLogo} alt="Metzium" fill className="object-contain" />
          </div>
        </Link>
      </div>

      <div className="fixed top-6 right-6 z-50 flex items-center gap-2 md:top-12 md:right-12 md:gap-3">
        {isLoggedIn ? (
          <div ref={userMenuRef} className="relative hidden md:block">
            <button
              type="button"
              onClick={() => setIsUserMenuOpen((previous) => !previous)}
              className="flex items-center gap-2 rounded-full border-2 border-white/60 bg-white/20 px-3 py-1.5 text-white shadow-lg backdrop-blur-sm transition-all duration-300 hover:bg-white/30"
            >
              <span className="grid h-7 w-7 place-items-center rounded-full bg-white/20 text-xs font-semibold text-white">
                {userInitial}
              </span>
              <span className="max-w-[120px] truncate text-sm font-medium">{userName}</span>
            </button>

            {isUserMenuOpen ? (
              <div className="absolute right-0 mt-2 w-64 rounded-2xl border border-white/30 bg-slate-900/90 p-3 shadow-2xl backdrop-blur">
                <p className="truncate text-sm font-semibold text-white">{userName}</p>
                <p className="truncate text-xs text-slate-300">{userEmail}</p>

                {isAdmin ? (
                  <Link
                    href="/admin"
                    onClick={() => setIsUserMenuOpen(false)}
                    className="mt-3 block rounded-lg border border-white/20 bg-white/5 px-3 py-2 text-sm text-white transition hover:bg-white/10"
                  >
                    Admin dashboard
                  </Link>
                ) : null}

                <div className="mt-2 border-t border-white/10 pt-2">
                  <button
                    type="button"
                    onClick={openLogoutConfirm}
                    className="block w-full rounded-lg border border-rose-300/40 bg-rose-500/10 px-3 py-2 text-left text-sm font-medium text-rose-100 transition hover:bg-rose-500/20"
                  >
                    Log out
                  </button>
                </div>
              </div>
            ) : null}
          </div>
        ) : (
          <>
            <Link
              href="/login"
              className="hidden items-center gap-1.5 rounded-full border-2 border-white/60 bg-white/20 px-5 py-2 text-sm font-medium text-white shadow-lg backdrop-blur-sm transition-all duration-300 hover:bg-white/30 md:flex"
            >
              <span>Login</span>
            </Link>
          </>
        )}

        {!isLoggedIn && isAdmin ? (
          <Link
            href="/admin"
            className="hidden items-center gap-1.5 rounded-full border-2 border-white/60 bg-white/20 px-5 py-2 text-sm font-medium text-white shadow-lg backdrop-blur-sm transition-all duration-300 hover:bg-white/30 md:flex"
          >
            Admin
          </Link>
        ) : null}

        <button
          onClick={() => setIsOpen((previous) => !previous)}
          className="rounded-full border-2 border-white/60 bg-white/20 p-2 text-white shadow-lg backdrop-blur-sm transition-all duration-300 hover:bg-white/30 md:hidden"
        >
          <svg className="h-5 w-5 md:h-6 md:w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {isOpen && (
        <div className="fixed top-20 right-6 z-50 min-w-[220px] rounded-2xl border-2 border-white/60 bg-white/20 p-3 shadow-lg backdrop-blur-sm md:hidden">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.id}
              href={link.href}
              onClick={() => handleLinkClick(link.id)}
              className="block rounded-lg px-3 py-2 text-sm text-white transition-colors duration-300 hover:bg-white/10"
            >
              {link.label}
            </Link>
          ))}

          {isLoggedIn ? (
            <>
              <div className="mt-2 rounded-xl border border-white/40 bg-white/10 px-3 py-2">
                <p className="truncate text-sm font-medium text-white">{userName}</p>
                <p className="truncate text-xs text-slate-200">{userEmail}</p>
              </div>
              {isAdmin ? (
                <Link
                  href="/admin"
                  onClick={() => setIsOpen(false)}
                  className="mt-2 block rounded-full border border-white/40 bg-white/10 px-3 py-2 text-center text-sm font-medium text-white transition-all duration-300 hover:bg-white/20"
                >
                  Admin
                </Link>
              ) : null}
              <div className="mt-2">
                <button
                  type="button"
                  onClick={openLogoutConfirm}
                  className="block w-full rounded-full border border-white/40 bg-white/10 px-3 py-2 text-center text-sm font-medium text-white transition-all duration-300 hover:bg-white/20"
                >
                  Logout
                </button>
              </div>
            </>
          ) : (
            <>
              <Link
                href="/login"
                onClick={() => setIsOpen(false)}
                className="mt-2 block rounded-full border border-white/40 bg-white/10 px-3 py-2 text-center text-sm font-medium text-white transition-all duration-300 hover:bg-white/20"
              >
                Login
              </Link>
              <Link
                href="/register"
                onClick={() => setIsOpen(false)}
                className="mt-2 block rounded-full border border-white/40 bg-white/10 px-3 py-2 text-center text-sm font-medium text-white transition-all duration-300 hover:bg-white/20"
              >
                Create account
              </Link>
            </>
          )}
        </div>
      )}

      <nav className="fixed top-6 left-1/2 z-50 w-fit -translate-x-1/2 md:top-12">
        <div className="hidden items-center gap-0 rounded-full border-2 border-white/60 bg-white/20 px-2 py-1 shadow-lg backdrop-blur-sm md:flex">
          <div className="relative flex w-full items-center">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.id}
                ref={(element) => {
                  desktopLinkRefs.current[link.id] = element;
                }}
                href={link.href}
                onClick={() => handleLinkClick(link.id)}
                className="relative z-10 flex-1 whitespace-nowrap px-6 py-2 text-center text-sm font-medium text-white transition-colors duration-300"
              >
                {link.label}
              </Link>
            ))}

            {sliderStyle.visible && (
              <div
                className="absolute -z-0 h-8 rounded-full bg-white/20 shadow-sm transition-all duration-300 ease-out"
                style={{
                  left: `${sliderStyle.left}px`,
                  width: `${sliderStyle.width}px`,
                }}
              />
            )}
          </div>
        </div>
      </nav>

      {isLogoutConfirmOpen ? (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 px-6"
          onClick={() => setIsLogoutConfirmOpen(false)}
        >
          <div
            className="w-full max-w-sm rounded-2xl border border-white/20 bg-slate-900/95 p-5 shadow-2xl backdrop-blur"
            onClick={(event) => event.stopPropagation()}
          >
            <h2 className="text-lg font-semibold text-white">Log out?</h2>
            <p className="mt-2 text-sm text-slate-300">
              Are you sure you want to log out of your account?
            </p>
            <div className="mt-5 flex gap-2">
              <button
                type="button"
                onClick={() => setIsLogoutConfirmOpen(false)}
                className="flex-1 rounded-lg border border-white/30 bg-white/5 px-3 py-2 text-sm font-medium text-white transition hover:bg-white/10"
              >
                Cancel
              </button>
              <form action={logoutAction} className="flex-1">
                <button
                  type="submit"
                  className="w-full rounded-lg border border-rose-300/50 bg-rose-500/20 px-3 py-2 text-sm font-medium text-rose-100 transition hover:bg-rose-500/30"
                >
                  Log out
                </button>
              </form>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
