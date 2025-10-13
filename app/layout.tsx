import type { Metadata } from "next";
import { Merriweather, Open_Sans } from "next/font/google";
import GoogleAnalytics from "./components/GoogleAnalytics";
import "./globals.css";

const merriweather = Merriweather({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["300", "400", "700"],
});

const openSans = Open_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
});

export const metadata: Metadata = {
  title: "La Marea B&B - Bed & Breakfast en Tigre",
  description: "La Marea B&B en Tigre, Buenos Aires. Pileta, jardín, desayuno incluido. Atención familiar y personalizada. Cerca de la estación y Río Luján.",
  keywords: ["bed and breakfast tigre", "b&b tigre", "hospedaje tigre", "alojamiento tigre", "hotel tigre", "turismo tigre", "pileta tigre"],
  authors: [{ name: "La Marea B&B" }],
  icons: {
    icon: '/icon.png',
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || '',
  },
  metadataBase: new URL('https://lamareatigre.com.ar'),
  alternates: {
    canonical: 'https://lamareatigre.com.ar',
  },
  openGraph: {
    title: "La Marea B&B - Bed & Breakfast en Tigre",
    description: "Bed & Breakfast en Tigre con pileta, jardín y desayuno. Atención familiar. Avenida Santiago de Liniers 573, Tigre.",
    url: 'https://lamareatigre.com.ar',
    siteName: 'La Marea B&B',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'La Marea B&B - Tigre',
      },
    ],
    type: "website",
    locale: "es_AR",
  },
  twitter: {
    card: "summary_large_image",
    title: "La Marea B&B - Tigre",
    description: "Bed & Breakfast en Tigre con pileta y jardín. Atención familiar.",
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${openSans.variable} ${merriweather.variable} antialiased`}
      >
        <GoogleAnalytics />
        {children}
      </body>
    </html>
  );
}
