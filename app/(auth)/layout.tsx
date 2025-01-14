import "@/app/globals.css";
import Providers from "@/providers/Providers";
import type { Metadata } from "next";
// import { Noto_Serif_Ethiopic } from "next/font/google";
import localFont from "next/font/local";
import { Toaster } from "sonner";

// const noto_serif_ethiopic = Noto_Serif_Ethiopic({ subsets: ["latin"] });
const myFont = localFont({
	src: "../../public/fonts/NotoSerifEthiopic-VariableFont_wdth,wght.ttf",
});

export const metadata: Metadata = {
	title: "የተጠቃሚ መግቢያ",
	description: "Efficiently manage and secure your account credentials.",
	icons: {
		icon: "/icons/favicon.ico",
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="am">
			<body className={myFont.className}>
				<Providers>
					<div className="absolute">
						<Toaster richColors position="top-center" />
					</div>
					{children}
				</Providers>
			</body>
		</html>
	);
}
