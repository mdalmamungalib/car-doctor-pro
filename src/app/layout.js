import "tailwindcss/tailwind.css"; // Tailwind CSS styles
import "daisyui/dist/full.css"; // DaisyUI styles (optional)
import "./globals.css";

import { Inter } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/services/AuthProvider";
import UseQueryClientProvider from "@/services/UseQueryClientProvider";
import "@smastrom/react-rating/style.css";
import HomeLayout from "components/HomeLayout/HomeLayout";
import SessionWarper from "@/services/SessionWarper";
export const dynamic = "force-dynamic";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: {
    default: "Car Doctor",
    template: "%s | Car Doctor"
  },
  description: "Car repair workshop",
  keywords: ["car repair", "workshop", "car service"],
 
};



export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-white text-black`}>
        <SessionWarper>
        <UseQueryClientProvider>
          <AuthProvider>
            <HomeLayout>{children}</HomeLayout>
          </AuthProvider>
        </UseQueryClientProvider>
        </SessionWarper>
      </body>
    </html>
  );
}
