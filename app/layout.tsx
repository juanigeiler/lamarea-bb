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
  title: "La Marea B&B - Bed & Breakfast en Tigre con Pileta | Alojamiento Tigre Buenos Aires",
  description: "La Marea B&B en Tigre, Buenos Aires. Bed and Breakfast con pileta, jardín amplio, estacionamiento y desayuno casero incluido. Atención familiar personalizada. A 5 minutos de la estación de Tigre y del Río Luján.",
  keywords: [
    "bed and breakfast tigre",
    "b&b tigre",
    "hospedaje tigre",
    "alojamiento tigre",
    "hotel tigre",
    "hotel con pileta tigre",
    "bed and breakfast con pileta tigre",
    "donde dormir en tigre",
    "hospedaje tigre centro",
    "alojamiento cerca estacion tigre",
    "turismo tigre",
    "hotel economico tigre",
    "hospedaje con desayuno tigre",
    "b&b buenos aires",
    "alojamiento familiar tigre",
    "hotel con jardin tigre",
    "hospedaje con estacionamiento tigre",
    "donde alojarse en tigre",
    "hotel boutique tigre"
  ],
  authors: [{ name: "La Marea B&B" }],
  icons: {
    icon: [
      { url: '/icon.png', sizes: '32x32', type: 'image/png' },
      { url: '/icon.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: '/icon.png',
    shortcut: '/icon.png',
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || '',
  },
  metadataBase: new URL('https://lamareatigre.com.ar'),
  alternates: {
    canonical: 'https://lamareatigre.com.ar',
  },
  openGraph: {
    title: "La Marea B&B - Bed & Breakfast en Tigre con Pileta y Jardín",
    description: "Bed & Breakfast en Tigre con pileta, jardín amplio, estacionamiento y desayuno casero incluido. Atención familiar personalizada. Avenida Santiago de Liniers 573, a 5 minutos de la estación de Tigre.",
    url: 'https://lamareatigre.com.ar',
    siteName: 'La Marea B&B - Tigre Buenos Aires',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'La Marea B&B - Bed and Breakfast con pileta en Tigre Buenos Aires',
      },
    ],
    type: "website",
    locale: "es_AR",
  },
  twitter: {
    card: "summary_large_image",
    title: "La Marea B&B - Bed & Breakfast con Pileta en Tigre",
    description: "Bed & Breakfast en Tigre con pileta, jardín amplio, estacionamiento y desayuno incluido. Atención familiar personalizada cerca de la estación.",
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
