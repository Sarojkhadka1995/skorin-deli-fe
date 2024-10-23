import "@/styles/globals.scss";
import Layout from "@/components/features/layout";
import type { AppProps } from "next/app";
import { DM_Sans } from "next/font/google";
import { ToasterComponent } from "@/components/features/shared/toast";

const dmSans = DM_Sans({
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm-sans",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={`${dmSans.variable} font-sans`}>
      <ToasterComponent />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </main>
  );
}
