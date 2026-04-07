import type { CSSProperties, ReactNode } from "react";

interface WorkspaceCardProps {
  eyebrow: string;
  title: string;
  description: string;
  accent?: string;
  meta?: string;
  children?: ReactNode;
}

interface StatPillProps {
  label: string;
  value: string;
  accent?: string;
}

const cardStyle: CSSProperties = {
  position: "relative",
  overflow: "hidden",
  borderRadius: "24px",
  padding: "24px",
  background:
    "linear-gradient(145deg, rgba(255,255,255,0.95), rgba(248,250,252,0.8))",
  border: "1px solid rgba(148, 163, 184, 0.18)",
  boxShadow: "0 24px 60px rgba(15, 23, 42, 0.12)",
  backdropFilter: "blur(18px)"
};

const eyebrowStyle: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: "8px",
  marginBottom: "12px",
  fontSize: "0.74rem",
  letterSpacing: "0.18em",
  textTransform: "uppercase",
  fontWeight: 700
};

const dotStyle = (accent: string): CSSProperties => ({
  width: "10px",
  height: "10px",
  borderRadius: "999px",
  background: accent,
  boxShadow: `0 0 18px ${accent}`
});

const titleStyle: CSSProperties = {
  margin: 0,
  fontSize: "1.5rem",
  lineHeight: 1.1,
  color: "#0f172a"
};

const descriptionStyle: CSSProperties = {
  margin: "12px 0 0",
  color: "#334155",
  lineHeight: 1.7
};

const metaStyle: CSSProperties = {
  marginTop: "18px",
  color: "#475569",
  fontSize: "0.9rem"
};

const statBaseStyle: CSSProperties = {
  display: "grid",
  gap: "4px",
  minWidth: "132px",
  padding: "14px 16px",
  borderRadius: "18px",
  background: "rgba(255, 255, 255, 0.72)",
  border: "1px solid rgba(148, 163, 184, 0.18)",
  boxShadow: "0 18px 42px rgba(15, 23, 42, 0.08)"
};

export function WorkspaceCard({
  eyebrow,
  title,
  description,
  accent = "#0f766e",
  meta,
  children
}: WorkspaceCardProps) {
  return (
    <section style={cardStyle}>
      <div
        style={{
          position: "absolute",
          inset: "auto -40px -60px auto",
          width: "140px",
          height: "140px",
          borderRadius: "999px",
          background: `${accent}18`,
          filter: "blur(10px)"
        }}
      />
      <div style={{ position: "relative", zIndex: 1 }}>
        <div style={{ ...eyebrowStyle, color: accent }}>
          <span style={dotStyle(accent)} />
          {eyebrow}
        </div>
        <h3 style={titleStyle}>{title}</h3>
        <p style={descriptionStyle}>{description}</p>
        {children}
        {meta ? <p style={metaStyle}>{meta}</p> : null}
      </div>
    </section>
  );
}

export function StatPill({
  label,
  value,
  accent = "#1d4ed8"
}: StatPillProps) {
  return (
    <div style={statBaseStyle}>
      <span
        style={{
          color: "#64748b",
          fontSize: "0.75rem",
          letterSpacing: "0.16em",
          textTransform: "uppercase",
          fontWeight: 700
        }}
      >
        {label}
      </span>
      <strong
        style={{
          color: accent,
          fontSize: "1.2rem",
          lineHeight: 1.1
        }}
      >
        {value}
      </strong>
    </div>
  );
}
