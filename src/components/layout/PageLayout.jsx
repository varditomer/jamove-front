import React from "react";
import { Header } from "./Header";

export const PageLayout = ({
  children,
  borderStyle = "none",
  className = "",
}) => {
  return (
    <div className="app-layout">
      <Header />
      <main className={`page-content ${className}`} style={{ borderStyle }}>
        {children}
      </main>
    </div>
  );
};
