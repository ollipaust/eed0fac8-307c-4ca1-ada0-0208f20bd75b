import React from "react";

const Content: React.FC<{children: any}> = ({children}, {props}: any) => {
  return (
    <main
      className="mainContent"
      {...props}
    >
      {children}
    </main>
  );
};

export default Content;
