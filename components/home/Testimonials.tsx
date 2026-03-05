"use client";

import { RevealWrapper, SectionLabel } from "@/components/ui";

const testimonials = [
  {
    author: "Abena K.",
    service: "Graduation Cap Topper",
    quote:
      "My graduation cap topper was absolutely breathtaking. Everyone kept asking where I got it — Sun truly outdid herself!",
    rating: 5,
  },
  {
    author: "Kofi & Adwoa M.",
    service: "Event Styling",
    quote:
      "The balloon installation for our event was stunning. The attention to detail was unmatched — guests couldn't stop taking photos.",
    rating: 5,
  },
  {
    author: "Efua S.",
    service: "Bridal Bouquet",
    quote:
      "I ordered a bridal bouquet and it exceeded every expectation. Lush, romantic, and perfectly matched my wedding theme.",
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      style={{
        background: "var(--cream-dark)",
        padding: "7rem 4rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative quote mark */}
      <div
        style={{
          position: "absolute",
          top: "-2rem",
          left: "3rem",
          fontFamily: '"Cormorant Garamond", serif',
          fontSize: "22rem",
          color: "rgba(27,67,50,0.05)",
          lineHeight: 1,
          pointerEvents: "none",
          userSelect: "none",
        }}
      >
        "
      </div>

      <div style={{ maxWidth: "500px", margin: "0 auto" }}>
        <RevealWrapper className="text-center mb-2">
          <SectionLabel center>Kind Words</SectionLabel>
          <h2
            style={{
              fontFamily: '"Cormorant Garamond", serif',
              fontSize: "clamp(2rem, 4vw, 3.2rem)",
              fontWeight: 400,
              color: "var(--green)",
              lineHeight: 1.15,
              textAlign: "center",
            }}
          >
            What Our <em style={{ fontStyle: "italic" }}>Clients</em> Say
          </h2>
        </RevealWrapper>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "1.5rem",
          marginTop: "3rem",
        }}
      >
        {testimonials.map((t, i) => (
          <RevealWrapper key={t.author} delay={(i + 1) as 1 | 2 | 3}>
            <div
              style={{
                background: "#fff",
                border: "1px solid rgba(27,67,50,0.1)",
                borderRadius: "4px",
                padding: "2rem",
                transition: "transform 0.25s, box-shadow 0.25s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.transform =
                  "translateY(-3px)";
                (e.currentTarget as HTMLDivElement).style.boxShadow =
                  "0 12px 40px rgba(27,67,50,0.1)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.transform =
                  "translateY(0)";
                (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
              }}
            >
              <div
                style={{
                  color: "var(--gold)",
                  fontSize: "0.85rem",
                  marginBottom: "1rem",
                }}
              >
                {"★".repeat(t.rating)}
              </div>
              <p
                style={{
                  fontFamily: '"Cormorant Garamond", serif',
                  fontSize: "1.05rem",
                  lineHeight: 1.75,
                  color: "var(--green)",
                  fontStyle: "italic",
                  marginBottom: "1.5rem",
                }}
              >
                "{t.quote}"
              </p>
              <div>
                <div
                  style={{
                    fontFamily: "Jost, sans-serif",
                    fontSize: "0.75rem",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "var(--green-light)",
                  }}
                >
                  {t.author}
                </div>
                <div
                  style={{
                    fontFamily: "Jost, sans-serif",
                    fontSize: "0.68rem",
                    color: "var(--gold)",
                    letterSpacing: "0.1em",
                    marginTop: "0.25rem",
                  }}
                >
                  — {t.service}
                </div>
              </div>
            </div>
          </RevealWrapper>
        ))}
      </div>
    </section>
  );
}
