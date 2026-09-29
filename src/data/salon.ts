import svcHair from "@/assets/svc-hair.jpg";
import svcSkin from "@/assets/svc-skin.jpg";
import svcMakeup from "@/assets/svc-makeup.jpg";
import svcSpa from "@/assets/svc-spa.jpg";
import svcWaxing from "@/assets/svc-waxing.jpg";
import svcNails from "@/assets/svc-nails.jpg";
import svcThreading from "@/assets/svc-threading.jpg";
import svcLashes from "@/assets/svc-lashes.jpg";
import pkgBridal from "@/assets/pkg-bridal.jpg";
import salonInterior from "@/assets/salon-interior.jpg";
import galBridalHair from "@/assets/gal-bridal-hair.jpg";

export type Service = {
  id: string;
  name: string;
  description: string;
  from: number;
  image: string;
  items: string[];
};

export const SERVICES: Service[] = [
  {
    id: "hair",
    name: "Hair Studio",
    description:
      "Precision cuts, glossy colour and restorative rituals shaped around your hair type.",
    from: 499,
    image: svcHair,
    items: ["Haircut", "Hair Styling", "Hair Spa", "Hair Coloring", "Keratin Treatment"],
  },
  {
    id: "skin",
    name: "Skin & Facial",
    description:
      "Dermat-inspired facials that decongest, brighten and leave skin visibly lit from within.",
    from: 899,
    image: svcSkin,
    items: ["Cleanup", "Facial", "Hydra Facial", "De-Tan", "Skin Polish"],
  },
  {
    id: "makeup",
    name: "Makeup",
    description:
      "Soft glam to full HD bridal artistry, blended to photograph beautifully in any light.",
    from: 1999,
    image: svcMakeup,
    items: ["Party Makeup", "Engagement Makeup", "Bridal Makeup", "HD Makeup"],
  },
  {
    id: "spa",
    name: "Spa & Relaxation",
    description:
      "Slow, aromatic bodywork in a private suite designed to melt a long week away.",
    from: 1499,
    image: svcSpa,
    items: ["Body Spa", "Head Massage", "Aromatherapy", "Relaxation Treatments"],
  },
  {
    id: "waxing",
    name: "Waxing",
    description:
      "Gentle low-temperature waxes and soothing after-care for smooth, calm skin.",
    from: 349,
    image: svcWaxing,
    items: ["Full Body Wax", "Arms", "Legs", "Underarms", "Face Wax"],
  },
  {
    id: "nails",
    name: "Nails",
    description:
      "Sculpted shapes, long-wear gel colour and hand-painted art on immaculate tools.",
    from: 599,
    image: svcNails,
    items: ["Manicure", "Pedicure", "Nail Art", "Gel Polish"],
  },
  {
    id: "threading",
    name: "Threading",
    description:
      "Brow mapping and feather-light threading that flatters your natural bone structure.",
    from: 99,
    image: svcThreading,
    items: ["Eyebrows", "Upper Lip", "Full Face"],
  },
  {
    id: "lashes",
    name: "Lashes & Brows",
    description:
      "Weightless extensions, lifts and tints for an awake, effortless everyday eye.",
    from: 1299,
    image: svcLashes,
    items: ["Lash Extensions", "Lash Lift", "Brow Styling"],
  },
];

export type Package = {
  id: string;
  name: string;
  price: number;
  tagline: string;
  includes: string[];
  popular?: boolean;
  image?: string;
  cta?: string;
};

export const PACKAGES: Package[] = [
  {
    id: "bridal-glam",
    name: "Bridal Glam",
    price: 14999,
    tagline: "The complete wedding-day ritual, start to aisle.",
    includes: [
      "Bridal Makeup",
      "Hair Styling",
      "Draping",
      "Manicure",
      "Pedicure",
      "Facial",
      "Eyebrow Styling",
    ],
    popular: true,
    image: pkgBridal,
    cta: "Book Bridal Package",
  },
  {
    id: "pre-bridal-glow",
    name: "Pre-Bridal Glow",
    price: 9999,
    tagline: "Six weeks of prep, condensed into one glowing day.",
    includes: ["Facial", "Full Body Wax", "Manicure", "Pedicure", "Hair Spa", "De-Tan"],
  },
  {
    id: "party-ready",
    name: "Party Ready",
    price: 4999,
    tagline: "Evening-ready in under two hours.",
    includes: ["Party Makeup", "Hair Styling", "Eyebrow Styling", "Basic Manicure"],
  },
  {
    id: "self-care-day",
    name: "Self-Care Day",
    price: 3999,
    tagline: "An unhurried afternoon that belongs only to you.",
    includes: ["Facial", "Hair Spa", "Manicure", "Pedicure", "Head Massage"],
  },
];

export type GalleryItem = {
  id: string;
  category: "Makeup" | "Hair" | "Nails" | "Salon" | "Bridal";
  image: string;
  caption: string;
  tall?: boolean;
};

export const GALLERY: GalleryItem[] = [
  { id: "g1", category: "Bridal", image: pkgBridal, caption: "Kundan bridal, HD finish", tall: true },
  { id: "g2", category: "Salon", image: salonInterior, caption: "The studio floor" },
  { id: "g3", category: "Makeup", image: svcMakeup, caption: "Soft glam, engagement" },
  { id: "g4", category: "Hair", image: galBridalHair, caption: "Baby's breath updo", tall: true },
  { id: "g5", category: "Nails", image: svcNails, caption: "Nude gel with gold art" },
  { id: "g6", category: "Hair", image: svcHair, caption: "Balayage & gloss" },
  { id: "g7", category: "Makeup", image: svcLashes, caption: "Volume lash set" },
  { id: "g8", category: "Salon", image: svcSpa, caption: "Aromatherapy suite", tall: true },
  { id: "g9", category: "Makeup", image: svcSkin, caption: "Hydra facial glow" },
  { id: "g10", category: "Nails", image: svcThreading, caption: "Brow mapping detail" },
];

export const GALLERY_CATEGORIES = ["All", "Makeup", "Hair", "Nails", "Salon", "Bridal"] as const;

export type Testimonial = {
  id: string;
  quote: string;
  name: string;
  role: string;
  rating: number;
};

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    quote:
      "Absolutely loved my bridal makeup. The entire experience was so beautiful and relaxing.",
    name: "Ananya",
    role: "Bridal Glam client",
    rating: 5,
  },
  {
    id: "t2",
    quote:
      "The staff is extremely professional and the salon has such a luxurious atmosphere.",
    name: "Riya",
    role: "Spa & Facial regular",
    rating: 5,
  },
  {
    id: "t3",
    quote: "My hair transformation was incredible. I finally found my go-to salon!",
    name: "Meera",
    role: "Hair Studio client",
    rating: 5,
  },
  {
    id: "t4",
    quote:
      "Booked the Pre-Bridal Glow a month before my wedding and my skin had never looked better.",
    name: "Tanvi",
    role: "Pre-Bridal Glow client",
    rating: 5,
  },
];

export const TIME_SLOTS = [
  "09:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "02:00 PM",
  "03:00 PM",
  "04:00 PM",
  "05:00 PM",
  "06:00 PM",
  "07:00 PM",
];

export const SALON = {
  name: "LUMÉRA",
  subtitle: "Beauty Studio",
  tagline: "Beauty. Confidence. You.",
  address: "2nd Floor, Orchid House, 14 Aurum Lane, Bandra West, Mumbai 400050",
  phone: "+91 98200 41120",
  whatsapp: "919820041120",
  email: "hello@lumerabeauty.in",
  hours: [
    { days: "Monday – Saturday", time: "9:00 AM – 8:00 PM" },
    { days: "Sunday", time: "10:00 AM – 6:00 PM" },
  ],
  instagram: "https://instagram.com",
  facebook: "https://facebook.com",
};

export const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "Packages", href: "#packages" },
  { label: "About", href: "#about" },
  { label: "Gallery", href: "#gallery" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

export const ALL_BOOKABLE = [
  ...SERVICES.flatMap((s) =>
    s.items.map((item) => ({
      id: `${s.id}:${item}`,
      label: item,
      group: s.name,
      price: s.from,
      kind: "service" as const,
    })),
  ),
  ...PACKAGES.map((p) => ({
    id: `pkg:${p.id}`,
    label: p.name,
    group: "Packages",
    price: p.price,
    kind: "package" as const,
  })),
];

export function formatINR(value: number) {
  return `₹${value.toLocaleString("en-IN")}`;
}
