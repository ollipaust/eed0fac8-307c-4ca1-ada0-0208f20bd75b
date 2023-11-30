import React from "react";
import Header from "~/ui/components/header";
import Content from "~/ui/components/content";
import Footer from "~/ui/components/footer";

const Layout: React.FC<{children: React.ReactNode}> = ({children}) => {
  return (
    <>
      <Header />
      <Content>{children}</Content>
      <Footer />
    </>
  );
};

export default Layout;
