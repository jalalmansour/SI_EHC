"use client";

export default function AppShell({ children }) {
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f9f9f9" }}>
      {children}
    </div>
  );
}
