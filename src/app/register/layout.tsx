import type { Metadata } from "next";
import "./register.css";

export const metadata: Metadata = {
  title: "Register — CYPHER 4.0 | Rotaract Club of Atria",
  description: "Register your team for CYPHER 4.0, an 18-hour hackathon by Rotaract Club of Atria Institute of Technology.",
};

export default function RegisterLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
