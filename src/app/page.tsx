import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Facilities from "../components/Facilities";
import HowItWorks from "../components/HowItWorks";
import Pricing from "../components/Pricing";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Facilities />
      <div className="divider" style={{ margin: "0" }} />
      <HowItWorks />
      <div className="divider" style={{ margin: "0" }} />
      <Pricing />
      <Footer />
    </>
  );
}