export const SITE = {
  name: "Zia Dental Consultants",
  shortName: "Zia Dental",
  tagline: "Nurturing your smile, one connection at a time.",
  description:
    "Premium dental care in Islamabad led by Dr. Adeel ur Rehman — orthodontist and dentist offering braces, aligners, cosmetic dentistry, implants, and family care in a warm, modern clinic.",
  url: "https://ziadentalconsultants.com",
  doctor: {
    name: "Dr. Adeel ur Rehman",
    title: "Orthodontist & Dentist",
    credentials: "BDS · MSc Orthodontics",
    yearsExperience: 15,
  },
  contact: {
    phone: "03335100708",
    phoneFormatted: "+92 333 5100708",
    phoneHref: "tel:+923335100708",
    email: "ziadentalconsultants@gmail.com",
    emailHref: "mailto:ziadentalconsultants@gmail.com",
    whatsappHref: "https://wa.me/923335100708",
  },
  location: {
    address: "Melody Market, Civic Centre, Municipal Rd",
    area: "G-6 Markaz",
    city: "Islamabad",
    postal: "44000",
    country: "Pakistan",
    full: "Melody Market, Civic Centre, Municipal Rd, G-6 Markaz, Islamabad, 44000",
    mapsHref:
      "https://www.google.com/maps/search/?api=1&query=Zia+Dental+Consultants+Melody+Market+G-6+Markaz+Islamabad",
    embedSrc:
      "https://www.google.com/maps?q=Melody%20Market%2C%20Civic%20Centre%2C%20Municipal%20Rd%2C%20G-6%20Markaz%2C%20Islamabad&output=embed",
  },
  hours: {
    summary: "Open Daily · Closes 9 PM",
    detail: [
      { days: "Monday – Saturday", time: "10:00 AM – 9:00 PM" },
      { days: "Sunday", time: "12:00 PM – 9:00 PM" },
    ],
  },
  social: {
    facebook: "https://facebook.com/",
    instagram: "https://instagram.com/",
    whatsapp: "https://wa.me/923335100708",
  },
} as const;

export const NAV_LINKS = [
  { href: "#top", label: "Home", section: "top" },
  { href: "#services", label: "Services", section: "services" },
  { href: "#process", label: "Journey", section: "process" },
  { href: "#about", label: "About", section: "about" },
  { href: "#gallery", label: "Gallery", section: "gallery" },
  { href: "#faq", label: "FAQ", section: "faq" },
  { href: "#contact", label: "Contact", section: "contact" },
] as const;
