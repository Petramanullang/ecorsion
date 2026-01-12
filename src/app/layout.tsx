import "./globals.css";
import SiteNav from "@/components/SiteNav";

export const metadata = {
  title: "ECORSION - Nikel, Energi & Ekonomi",
  description:
    "Scroll adventure interaktif tentang nikel: tambang → baterai → dampak → solusi",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className="min-h-screen">
        <SiteNav />
        <div className="pt-4 sm:pt-[calc(var(--navH)+24px)]">{children}</div>
      </body>
    </html>
  );
}
