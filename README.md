# SecureNest – Smart Security & Home Automation Website

## 🏠 Project Overview

A professional, warm, and approachable business website for **SecureNest** — a home security and smart home automation solutions provider based in **Pune, India**. The website is designed to generate leads and inquiries from both B2B (builders/developers) and B2C (homeowners/villa owners) audiences.

**Unique Positioning:** "Smart Sustainable Homes Provider" — combining security + automation + solar energy.

---

## ✅ Completed Features

### Pages & Sections
- **Hero Section** — Compelling value proposition with interactive smart home dashboard mockup card, floating badges, animated device tiles, and trust indicators
- **Brand Partners Strip** — Logos/names for Hikvision, CP Plus, Dahua, Wipro Smart, Schneider, Alexa, Google Home
- **Services Section (4 cards)** — Security Systems, Home Automation, AMC & Support, Solar + Smart Integration
- **Solutions Section (Tabbed)** — Separate panels for Builders/Developers, Homeowners, and Villas/Bungalows with tailored benefits and stats
- **How It Works** — 5-step process: Free Consultation → Site Survey → Quotation → Installation → Handover
- **Portfolio Section** — 6 project cards with category filtering (All, Security, Automation, Builder, Villa)
- **Why Choose Us** — Features list + animated stat counters (500+ homes, 30+ projects, 98% satisfaction, 5 years)
- **Testimonials Slider** — 5 testimonials with auto-play, touch/swipe support, dot navigation
- **Pricing Packages** — 3 tiers: Essential Security (₹15K), Smart Home Bundle (₹45K), Smart Sustainable Home (₹1.2L)
- **CTA Banner** — Dark section with phone + email CTAs and animated orbit icons
- **Contact Section** — Full lead capture form + contact info card with service areas
- **Footer** — 4-column layout with links, brand info, and tagline
- **Floating WhatsApp Button** — Direct WhatsApp chat integration
- **Back to Top Button** — Appears on scroll

### Interactive Features
- ✅ Sticky navbar with scroll-triggered shadow/background change
- ✅ Mobile hamburger menu with overlay
- ✅ Smooth anchor scrolling with offset for fixed nav
- ✅ Active nav link highlighting based on scroll position
- ✅ Solutions tab switching with animation
- ✅ Portfolio filter by category
- ✅ Testimonials auto-sliding carousel (3-per-view desktop, 1 mobile) with swipe support
- ✅ Animated counters (intersection observer triggered)
- ✅ Scroll progress bar at top of page
- ✅ AOS (Animate on Scroll) reveal animations throughout
- ✅ Interactive device tiles on hero card
- ✅ Service area tags auto-fill the location form field
- ✅ Lead form with API submission to `tables/leads`
- ✅ Form success state after submission
- ✅ Hero CTA button pulse animation

### Design System
- **Color Palette:** Warm orange primary (#F97316), green accent (#22C55E), warm cream background (#FAF8F5)
- **Typography:** Plus Jakarta Sans (headings/body) + Lora (decorative)
- **Components:** Cards with hover effects, gradient buttons, floating badges, warm color fills
- **Fully responsive** — mobile, tablet, and desktop breakpoints

---

## 📁 File Structure

```
index.html              ← Main website (single page)
css/
  └── style.css         ← Complete stylesheet (~52KB)
js/
  └── main.js           ← All interactivity & animations (~22KB)
README.md               ← This file
```

---

## 🔗 Functional Entry Points (URIs)

| URL | Description |
|-----|-------------|
| `index.html` | Main website homepage |
| `index.html#home` | Hero section |
| `index.html#services` | Services overview |
| `index.html#solutions` | B2B/B2C solutions tabs |
| `index.html#process` | How it works steps |
| `index.html#portfolio` | Project portfolio with filters |
| `index.html#why-us` | Why choose SecureNest |
| `index.html#testimonials` | Client testimonials |
| `index.html#pricing` | Pricing packages |
| `index.html#contact` | Contact & lead form |

### API Endpoints Used

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `tables/leads` | Save lead form submissions |

---

## 🗄️ Data Models

### `leads` Table Schema

| Field | Type | Description |
|-------|------|-------------|
| `id` | text | Unique lead identifier (auto) |
| `name` | text | Prospect's full name |
| `phone` | text | Phone number |
| `email` | text | Email address |
| `clientType` | text (enum) | homeowner / villa / builder / society / other |
| `interests` | array | Selected services: security, automation, solar, amc |
| `location` | text | Area in Pune |
| `message` | rich_text | Additional requirements message |
| `submittedAt` | datetime | Form submission timestamp |

---

## 🚀 Business Context

- **Business:** SecureNest / RenewaTech — Home Security & Automation Setup, Pune
- **Services:** CCTV, Smart Locks, Video Door Phones, Motion Sensors, Smart Lighting, Voice Control, Curtain Automation, Solar Integration, AMC
- **Target B2B:** Real estate builders, developers, housing societies
- **Target B2C:** Homeowners, villa/bungalow owners, flat owners
- **Revenue Model:** Project-based margin (20–40%) + Annual Maintenance Contracts (AMC)
- **Technology Partners:** Hikvision, CP Plus, Dahua, Wipro Smart, Schneider, Tuya, Alexa, Google Home

---

## 🔧 Features Not Yet Implemented

- [ ] Blog / content marketing section
- [ ] Live chat widget integration
- [ ] Google Maps embed for office location
- [ ] Photo gallery with real before/after installation images
- [ ] WhatsApp Business API deep links per service
- [ ] Admin dashboard to view submitted leads
- [ ] SEO meta tags, Open Graph, and structured data (JSON-LD)
- [ ] Google Analytics / tracking integration
- [ ] Multi-language support (Marathi/Hindi)
- [ ] Online booking / appointment calendar

---

## 📈 Recommended Next Steps

1. **Replace placeholder phone/email** — Update `+91 99999 99999` and `hello@securenest.in` with real contact details
2. **Add real project photos** — Replace gradient portfolio cards with actual before/after installation images
3. **Connect WhatsApp Business** — Update WhatsApp number in the floating button and CTAs
4. **SEO optimization** — Add proper meta descriptions, Open Graph tags, and JSON-LD schema for local business
5. **Google Business Profile** — Embed map and link to Google reviews
6. **Leads dashboard** — Build an admin view to see form submissions from `tables/leads`
7. **Instagram feed embed** — Show real installation reels from Instagram
8. **A/B test CTAs** — Test different button text and hero copy for conversion optimization
9. **Add real testimonials** — Replace placeholder testimonials with verified client reviews with photos

---

*Built with HTML5, CSS3 (custom design system), Vanilla JavaScript, AOS animations, Font Awesome icons, and Plus Jakarta Sans / Lora typography via Google Fonts.*
