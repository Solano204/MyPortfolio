import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import StarsCanvas from "@/components/ui/StartsCanvas";
import { Toaster } from "sonner";
import { ViewTransitions } from "next-view-transitions";
import NavBar from "@/components/Hero/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Carlos Solano",
  description: "Portfolio de Carlos Solano",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <ViewTransitions>
          <Toaster />
          <link rel="icon" href="/favicon.ico" sizes="any" />

          <body className={inter.className}>
            {/* Stars Canvas - Background Layer */}
            <StarsCanvas />

            {/* Main Content */}
            <div className="relative z-20">
              <NavBar />
              {children}
            </div>
          </body>
        </ViewTransitions>
      </ThemeProvider>
    </html>
  );
}
