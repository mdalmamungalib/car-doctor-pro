import HomePage from "components/HomePage/HomePage";
import 'tailwindcss/tailwind.css'
// import { unstable_noStore as noStore } from "next/cache";
export const dynamic = "force-dynamic";

export default function Home() {
  
  return (
    <HomePage/>
  );
}
