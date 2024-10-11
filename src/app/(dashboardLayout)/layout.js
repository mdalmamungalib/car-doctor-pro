import 'tailwindcss/tailwind.css';  // Tailwind CSS styles
import 'daisyui/dist/full.css';     // DaisyUI styles (optional)
import '../globals.css';

import { Inter } from "next/font/google";
import "../globals.css";
import AuthProvider from "@/services/AuthProvider";
import UseQueryClientProvider from "@/services/UseQueryClientProvider";
import '@smastrom/react-rating/style.css'

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "CAr Doctor Pro",
  description: "Car reaper work shop",
};

export default function RootLayout({ children }) {
  return (
   
        <UseQueryClientProvider>
          <AuthProvider>
            <div className={`min-h-screen max-w-[1140px] mx-auto p-5 lg:px-0 ${inter.className} bg-white text-black`}>
              {children}
            </div>
          </AuthProvider>
          </UseQueryClientProvider>
  );
}
