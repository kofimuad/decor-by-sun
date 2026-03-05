"use client";

import { useState, useEffect } from "react";
import SunLogo from "@/components/ui/SunLogo";

const links = [
  { label: "Services", href: "/#services" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "About", href: "/about" },
  { label: "Reviews", href: "/#testimonials" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    handler();
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        padding: "1rem 3rem",
        background: scrolled ? "rgba(8,20,14,0.95)" : "rgba(8,20,14,0.82)",
        backdropFilter: "blur(18px)",
        WebkitBackdropFilter: "blur(18px)",
        borderBottom: "1px solid rgba(255,255,255,0.07)",
        transition: "background 0.3s",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      {/* Logo only — no text */}
      <a
        href="/"
        style={{
          display: "flex",
          alignItems: "center",
          textDecoration: "none",
        }}
      >
        <SunLogo size={40} />
      </a>

      {/* Desktop links */}
      <div
        style={{ display: "flex", alignItems: "center", gap: "2.5rem" }}
        className="desktop-nav"
      >
        {links.map((l) => (
          <a
            key={l.label}
            href={l.href}
            style={{
              color: "rgba(245,240,232,0.78)",
              textDecoration: "none",
              fontFamily: "Jost, sans-serif",
              fontSize: "0.72rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              fontWeight: 400,
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--cream)")}
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = "rgba(245,240,232,0.78)")
            }
          >
            {l.label}
          </a>
        ))}
        <a
          href="/#booking"
          style={{
            background: "var(--gold)",
            color: "var(--green)",
            padding: "0.6rem 1.4rem",
            borderRadius: "2px",
            textDecoration: "none",
            fontFamily: "Jost, sans-serif",
            fontSize: "0.7rem",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            fontWeight: 600,
            transition: "background 0.2s",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.background = "var(--gold-light)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.background = "var(--gold)")
          }
        >
          Book Now
        </a>
      </div>

      {/* Mobile burger */}
      <button
        onClick={() => setOpen((o) => !o)}
        className="burger-btn"
        style={{
          display: "none",
          background: "none",
          border: "none",
          cursor: "pointer",
          color: "var(--cream)",
          fontSize: "1.4rem",
          padding: "0.2rem",
        }}
        aria-label="Menu"
      >
        {open ? "✕" : "☰"}
      </button>

      {/* Mobile menu */}
      {open && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            background: "rgba(8,20,14,0.98)",
            backdropFilter: "blur(20px)",
            borderBottom: "1px solid rgba(255,255,255,0.1)",
            padding: "1rem 0",
          }}
        >
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              onClick={() => setOpen(false)}
              style={{
                display: "block",
                padding: "0.85rem 2rem",
                color: "rgba(245,240,232,0.85)",
                textDecoration: "none",
                fontFamily: "Jost, sans-serif",
                fontSize: "0.8rem",
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                borderBottom: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              {l.label}
            </a>
          ))}
          <a
            href="/#booking"
            onClick={() => setOpen(false)}
            style={{
              display: "block",
              margin: "1rem 2rem 0.5rem",
              background: "var(--gold)",
              color: "var(--green)",
              padding: "0.8rem 1.5rem",
              textAlign: "center",
              borderRadius: "2px",
              textDecoration: "none",
              fontFamily: "Jost, sans-serif",
              fontSize: "0.75rem",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              fontWeight: 600,
            }}
          >
            Book Now
          </a>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .burger-btn  { display: block !important; }
        }
      `}</style>
    </nav>
  );
}
