import React, { Children } from "react";
import Header from "../headerC/Header";
interface DefaultLayoutPropos {
  children: React.ReactNode;
}
export default function DefaultLayout({ children }: DefaultLayoutPropos) {
  return (
    <>
      <header>
        <Header />
      </header>
      <main>{children}</main>
    </>
  );
}
