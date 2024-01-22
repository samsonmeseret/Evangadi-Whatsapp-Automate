import React from "react";
import Header from "../Header/Header";

const Layout = ({ children }) => {
  return (
    <section>
      <Header />
      <div>{children}</div>
    </section>
  );
};

export default Layout;
