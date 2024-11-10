import React, { FC } from "react";
import Header from "./header";
import Footer from "./footer";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const Layout: FC<{ children: React.ReactNode }> = ({ children }) => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Header />
      {children}
      <Footer />
    </QueryClientProvider>
  );
};

export default Layout;
