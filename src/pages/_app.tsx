import "@/styles/globals.scss";
import Layout from "@/components/features/layout";
import type { AppProps } from "next/app";
import { Libre_Franklin } from "next/font/google";
import { ToasterComponent } from "@/components/features/shared/toast";

export const librefranklin = Libre_Franklin({
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-libre-franklin",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={`${librefranklin.variable} font-sans`}>
      <ToasterComponent />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </main>
  );
}
