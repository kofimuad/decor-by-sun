"use client";
import { SectionLabel } from "@/components/ui";

const services = [
  {
    icon: "🎓",
    name: "Graduation Cap Topper",
    desc: "Your graduation is one of the most significant milestones of your life. Our bespoke cap toppers are custom-designed to capture your achievement, personality, and style — making your graduation photos truly unforgettable.",
    includes: [
      "Custom design consultation",
      "Name/year personalization",
      "Color-matched to your gown",
      "Photo-ready finish",
    ],
  },
  {
    icon: "💐",
    name: "Floral & Balloon Bouquet",
    desc: "A lush, hand-crafted bouquet that blends fresh florals and elegant balloons. Perfect as a graduation gift, birthday surprise, or celebration centerpiece.",
    includes: [
      "Fresh floral selection",
      "Balloon arrangement",
      "Custom wrapping",
      "Ribbon & finishing",
    ],
  },
  {
    icon: "🌸",
    name: "Topper + Bouquet Set",
    desc: "The perfect combination — a matching cap topper and bouquet designed together for a cohesive, stunning look. Our most popular graduation package.",
    includes: [
      "Custom cap topper",
      "Matching bouquet",
      "Coordinated color scheme",
      "Presentation packaging",
    ],
  },
  {
    icon: "🎈",
    name: "Balloon & Event Styling",
    desc: "Transform any venue into an elegant, Instagram-worthy space. From balloon arches to full venue décor, we handle everything so you can enjoy your celebration.",
    includes: [
      "Balloon arch/installation",
      "Backdrop design",
      "Table centerpieces",
      "Full venue styling",
    ],
  },
  {
    icon: "💍",
    name: "Bridal Bouquet & Wedding Favors",
    desc: "Your wedding day deserves perfection. We create exquisite bridal bouquets, bridesmaids arrangements, and beautifully crafted wedding favors that reflect your love story.",
    includes: [
      "Bridal bouquet",
      "Bridesmaids bouquets",
      "Wedding favors",
      "Keepsake design",
    ],
  },
];

export default function ServicesPage() {
  return (
    <div
      style={{
        paddingTop: "100px",
        minHeight: "100vh",
        background: "var(--cream)",
      }}
    >
      {/* Header */}
      <div
        style={{
          background: "var(--green)",
          padding: "5rem 4rem",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `url('https://images.unsplash.com/photo-1487530811015-780c3e59e1b5?w=1200&q=60') center/cover`,
            opacity: 0.12,
          }}
        />
        <div style={{ position: "relative", textAlign: "center" }}>
          <SectionLabel light center>
            What We Offer
          </SectionLabel>
          <h1
            style={{
              fontFamily: '"Cormorant Garamond", serif',
              fontSize: "clamp(2.5rem, 5vw, 4rem)",
              fontWeight: 300,
              color: "var(--cream)",
              lineHeight: 1.1,
            }}
          >
            Our{" "}
            <em style={{ fontStyle: "italic", color: "var(--gold-light)" }}>
              Services
            </em>
          </h1>
        </div>
      </div>

      {/* Service list */}
      <div
        style={{ padding: "5rem 4rem", maxWidth: "1000px", margin: "0 auto" }}
      >
        {services.map((s, i) => (
          <div
            key={s.name}
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "3rem",
              alignItems: "center",
              padding: "3rem 0",
              borderBottom:
                i < services.length - 1
                  ? "1px solid rgba(27,67,50,0.1)"
                  : "none",
              direction: i % 2 === 1 ? "rtl" : "ltr",
            }}
          >
            <div style={{ direction: "ltr" }}>
              <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>
                {s.icon}
              </div>
              <h2
                style={{
                  fontFamily: '"Cormorant Garamond", serif',
                  fontSize: "1.8rem",
                  color: "var(--green)",
                  fontWeight: 400,
                  marginBottom: "1rem",
                }}
              >
                {s.name}
              </h2>
              <p
                style={{
                  fontFamily: "Jost, sans-serif",
                  fontSize: "0.9rem",
                  color: "var(--green-light)",
                  lineHeight: 1.8,
                  fontWeight: 300,
                  marginBottom: "1.5rem",
                }}
              >
                {s.desc}
              </p>
              <a
                href="/#booking"
                style={{
                  display: "inline-block",
                  background: "var(--green)",
                  color: "var(--cream)",
                  padding: "0.75rem 1.8rem",
                  borderRadius: "2px",
                  textDecoration: "none",
                  fontFamily: "Jost, sans-serif",
                  fontSize: "0.72rem",
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  transition: "background 0.2s",
                }}
                onMouseEnter={(e: any) =>
                  (e.currentTarget.style.background = "var(--green-mid)")
                }
                onMouseLeave={(e: any) =>
                  (e.currentTarget.style.background = "var(--green)")
                }
              >
                Book this service
              </a>
            </div>
            <div
              style={{
                direction: "ltr",
                background: "rgba(27,67,50,0.04)",
                border: "1px solid rgba(27,67,50,0.1)",
                borderRadius: "4px",
                padding: "2rem",
              }}
            >
              <p
                style={{
                  fontFamily: "Jost, sans-serif",
                  fontSize: "0.68rem",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "var(--gold)",
                  marginBottom: "1rem",
                }}
              >
                What's included
              </p>
              <ul style={{ listStyle: "none" }}>
                {s.includes.map((item) => (
                  <li
                    key={item}
                    style={{
                      display: "flex",
                      gap: "0.7rem",
                      marginBottom: "0.6rem",
                      fontFamily: "Jost, sans-serif",
                      fontSize: "0.85rem",
                      color: "var(--green)",
                      alignItems: "center",
                    }}
                  >
                    <span style={{ color: "var(--gold)", flexShrink: 0 }}>
                      ✦
                    </span>{" "}
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div
        style={{
          background: "var(--green-dark)",
          padding: "4rem",
          textAlign: "center",
        }}
      >
        <h2
          style={{
            fontFamily: '"Cormorant Garamond", serif',
            fontSize: "2rem",
            color: "var(--cream)",
            fontWeight: 300,
            marginBottom: "1.5rem",
          }}
        >
          Not sure what you need?{" "}
          <em style={{ fontStyle: "italic", color: "var(--gold-light)" }}>
            Let's talk.
          </em>
        </h2>
        <a
          href="/contact"
          style={{
            display: "inline-block",
            background: "var(--gold)",
            color: "var(--green)",
            padding: "0.85rem 2.2rem",
            borderRadius: "2px",
            textDecoration: "none",
            fontFamily: "Jost, sans-serif",
            fontSize: "0.75rem",
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            fontWeight: 600,
          }}
        >
          Contact Us
        </a>
      </div>
    </div>
  );
}
