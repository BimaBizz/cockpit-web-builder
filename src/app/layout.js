import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { fetcSettings } from "@/lib/hook";

const inter = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export async function generateMetadata() {
  const setting = await fetcSettings();

  const otherMetadata = {};
  if (setting.meta && typeof setting.meta === 'object') {
    for (const key in setting.meta) {
      if (setting.meta[key]) {
        otherMetadata[key] = setting.meta[key];
      }
    }
  }

  return {
    title: {
      template: `%s | ${setting.seo.title}`,
      default: setting.seo.title,
    },
    description: setting.seo.description,
    keywords: setting.seo.keywords,
    robots: {
      index: !setting.seo.noindex,
      follow: !setting.seo.nofollow,
      googleBot: {
        index: !setting.seo.noindex,
        follow: !setting.seo.nofollow,
      },
    },
    icons: {
      icon: `${process.env.HOST}/storage/uploads${setting.images.favicon.path}`,
    },
    openGraph: {
      title: setting.seo.image.title,
      description: setting.seo.image.description,
      url: process.env.DOMAIN,
      siteName: setting.seo.title,
      images: [
        {
          url: `${process.env.HOST}/storage/uploads${setting.seo.image.path}`, // Must be an absolute URL
          width: 800,
          height: 600,
        },
        {
          url: `${process.env.HOST}/storage/uploads${setting.seo.image.path}`, // Must be an absolute URL
          width: 1800,
          height: 1600,
          alt: setting.seo.image.title,
        },
      ],
    },
    other: Object.keys(otherMetadata).length > 0 ? otherMetadata : undefined,
  };
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
