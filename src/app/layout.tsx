import "./globals.css";
import 'leaflet/dist/leaflet.css';
import localFont from 'next/font/local';
import { Montserrat } from 'next/font/google';
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import WhatsAppChatButton from "./components/layout/WhatsApp";
import ClientWrapper from "./components/layout/ClientWrapper";

const terpelSans = localFont({
  src: [
    {
      path: '../../public/fuentes/TerpelSans-Light.otf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../../public/fuentes/TerpelSans-Regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fuentes/Terpel-Sans-Regular-Condensed.otf',
      weight: '400',
      style: 'condensed',
    },
    {
      path: '../../public/fuentes/TerpelSans-Medium.otf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../public/fuentes/Terpel-Sans-Medium-Condensed.otf',
      weight: '500',
      style: 'condensed',
    },
    {
      path: '../../public/fuentes/TerpelSans-Bold.otf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../../public/fuentes/TerpelSans-Black.otf',
      weight: '900',
      style: 'normal',
    },
    {
      path: '../../public/fuentes/TerpelSans-ExtraBold.otf',
      weight: '800',
      style: 'normal',
    }
  ],
  display: 'swap',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${terpelSans.className} ${montserrat.className}`}>
      <body className="overflow-x-hidden min-w-full">
        <ClientWrapper
          navbar={<Navbar />}
          footer={<Footer />}
          whatsapp={<WhatsAppChatButton />}
        >
          {children}
          
        </ClientWrapper>
      </body>
    </html>
  );
}