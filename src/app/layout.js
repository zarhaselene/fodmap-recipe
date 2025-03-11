import "./globals.css";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

export const metadata = {
  title: "Low FODMAP Recipe Finder | IBS-Friendly Meals",
  description:
    "Discover delicious, IBS-friendly recipes with our Low FODMAP Recipe Finder. Search, save, and explore meals tailored to your dietary needs.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
