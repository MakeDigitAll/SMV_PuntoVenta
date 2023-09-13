import React, { Children } from "react";

interface DefaultLayoutPropos {
  children: React.ReactNode;
}
export default function DefaultLayout({ children }: DefaultLayoutPropos) {
  return (
    <>
      <header>
        
      </header>
      <main>{children}</main>
    </>
  );
}
