"use client";
import React from "react";
import { usePathname } from "next/navigation";
import Footer from "./Footer";
import Header from "./Header";

const Layout = ({ children }) => {
  const pathname = usePathname();
  const footerRoutes = ["/login", "/registration"];
  const visibleFooter = footerRoutes.includes(pathname);

  return (
    <>
      <Header />
      {children}
      {visibleFooter && <Footer />}
    </>
  );
};

export default Layout;
