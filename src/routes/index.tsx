import { createFileRoute } from "@tanstack/react-router";
import { BookingProvider } from "@/components/site/booking-context";
import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import { Offer } from "@/components/site/Offer";
import { Services } from "@/components/site/Services";
import { Packages } from "@/components/site/Packages";
import { BeforeAfter } from "@/components/site/BeforeAfter";
import { About } from "@/components/site/About";
import { Gallery } from "@/components/site/Gallery";
import { Testimonials } from "@/components/site/Testimonials";
import { Contact } from "@/components/site/Contact";
import { Footer } from "@/components/site/Footer";
import { BookingModal } from "@/components/site/BookingModal";
import { MobileBookBar } from "@/components/site/MobileBookBar";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <BookingProvider>
      <div id="home" className="min-h-screen overflow-x-hidden bg-background">
        <Navbar />
        <main>
          <Hero />
          <Offer />
          <Services />
          <Packages />
          <BeforeAfter />
          <About />
          <Gallery />
          <Testimonials />
          <Contact />
        </main>
        <Footer />
        <MobileBookBar />
        <BookingModal />
      </div>
    </BookingProvider>
  );
}
