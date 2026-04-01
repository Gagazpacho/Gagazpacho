import type { Metadata } from 'next';
import { Geist_Mono, Instrument_Serif, Montserrat } from 'next/font/google';
import "./globals.css"
import { CartProvider } from "./context/CartContext";

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
});

const instrumentSerif = Instrument_Serif({
	variable: '--font-instrument',
	subsets: ['latin'],
	weight: '400',
	style: ['italic', 'normal'],
});

const montserrat = Montserrat({
	variable: '--font-montserrat',
	subsets: ['latin'],
	weight: ['400', '700'],
});

export const metadata: Metadata = {
	title: 'GAGAZPACHO',
	icons: { icon: '../images/logo2.webp' },
	
    generator: 'v0.app'
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={`${geistMono.variable} ${instrumentSerif.variable} ${montserrat.variable} antialiased`}
			>
				<CartProvider>
					{children}
				</CartProvider>
			</body>
		</html>
	);
}
