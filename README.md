# AIAXOM — Luxury Assamese Silk Boutique
**Full-Stack Luxury E-Commerce: React 19 Frontend + FastAPI Backend + Supabase PostgreSQL**

> A modern, editorial, luxury fashion boutique experience for **AIAXOM**, celebrating Assamese handloom silks (Muga, Eri, Paat Silk, Bridal Couture, Occasion Wear, and Ready-to-Wear) handwoven in Sualkuchi, Assam. Inspired by the editorial elegance, visual hierarchy, and craftsmanship storytelling of Tarun Tahiliani.

---

## ✦ Luxury Design System

- **Color Palette**:
  - **Warm Ivory**: `#F8F5EF` (Primary background, soft unbleached silk)
  - **Deep Charcoal**: `#24211D` (Refined text and architectural framing)
  - **Muga Gold**: `#B69A62` (Accent color inspired by wild *Antheraea assamensis*)
  - **Muted Beige**: `#E8DFD1` (Hairline borders and soft pill backdrops)
  - **White**: `#FFFFFF` (Product card containers and editorial blocks)
- **Typography**:
  - **Headings**: *Cormorant Garamond* & *Playfair Display* (Regal serif with classical poise)
  - **Body & Navigation**: *Montserrat* & sans-serif with spacious letter-tracking
- **Visual Style**:
  - Full-width hero campaigns with subtle gradient overlays
  - Editorial asymmetry and generous whitespace
  - Minimal sticky navigation with expandable mega-menu
  - Clean product cards without excessive drop-shadows
  - Fully responsive across mobile, tablet, laptop, and desktop

---

## ✦ Full-Stack Architecture

```text
aiaxom-silk-boutique/
├── backend/                        # Python + FastAPI + Supabase Backend
│   ├── app/
│   │   ├── data/seed_data.py       # Catalog, consultation & order seed data
│   │   ├── routers/
│   │   │   ├── auth.py             # /api/auth (Login, Register, Profile)
│   │   │   ├── consultations.py    # /api/consultations (Bridal inquiries)
│   │   │   ├── orders.py           # /api/orders (Client checkout dispatches)
│   │   │   └── products.py         # /api/products (Silk catalog CRUD)
│   │   ├── config.py               # Pydantic settings & environment loader
│   │   ├── database.py             # Dual-mode Supabase client & resilience store
│   │   ├── main.py                 # FastAPI application & CORS configuration
│   │   └── models.py               # Pydantic data schemas
│   ├── requirements.txt            # Python dependencies (fastapi, supabase, pydantic, uvicorn)
│   ├── run.py                      # Backend launcher (`python run.py`)
│   ├── supabase_schema.sql         # Supabase PostgreSQL schema, RLS policies & seeds
│   └── README.md                   # Backend documentation & Supabase setup guide
├── src/                            # React 19 Frontend
│   ├── components/                 # 13 Reusable luxury UI components
│   │   ├── AnnouncementBar.jsx     # Rotating top announcement bar
│   │   ├── Navbar.jsx              # Sticky header with mega-menu, search & bag
│   │   ├── MegaMenu.jsx            # Expandable 7-category luxury shop mega-menu
│   │   ├── Hero.jsx                # Full-screen editorial campaign hero
│   │   ├── CollectionShowcase.jsx  # "Signature Expressions" 4-card showcase
│   │   ├── ProductCard.jsx         # Clean product card with size & bag controls
│   │   ├── FeaturedProducts.jsx    # "Curated in Silk" tabbed product showcase
│   │   ├── Craftsmanship.jsx       # "The Soul of Assamese Craft" 3-pillar narrative
│   │   ├── BridalShowcase.jsx      # Haute bridal editorial split-section
│   │   ├── LookbookGallery.jsx     # Asymmetric fashion grid with image modal
│   │   ├── Newsletter.jsx          # Validated client-side email subscription
│   │   ├── Footer.jsx              # Editorial footer with links, ataliers & socials
│   │   └── ConsultationModal.jsx   # Accessible modal for bespoke consultations
│   ├── pages/                      # 12 Boutique pages & dashboards
│   │   ├── Home.jsx                # Complete homepage rendering sections A through K
│   │   ├── Shop.jsx                # All products page with category filters & sorting
│   │   ├── ProductDetails.jsx      # High-res gallery, size/quantity, craft tabs
│   │   ├── Collections.jsx         # Curated anthologies with story & preview items
│   │   ├── Bridal.jsx              # Bespoke bridal salon & 4-step couture process
│   │   ├── Lookbook.jsx            # Campaign plates, category filters & zoom modal
│   │   ├── OurCraft.jsx            # In-depth Sualkuchi heritage & motif glossary
│   │   ├── About.jsx               # The story of AIAXOM, Ahom heritage & weaver ethics
│   │   ├── Contact.jsx             # Flagship ateliers, contact form & FAQ
│   │   ├── Cart.jsx                # Working cart with localStorage & checkout
│   │   ├── Admin.jsx               # Atelier Admin console with live backend badge
│   │   ├── Login.jsx               # Private Client & Admin Sign In / Registration
│   │   └── Logout.jsx              # Graceful session conclusion & farewell page
│   ├── services/
│   │   └── api.js                  # Frontend API client with fallback resilience
│   ├── data/
│   │   ├── products.js             # Local mock product masterworks
│   │   └── collections.js          # Signature collections and lookbook items
│   ├── context/
│   │   └── CartContext.jsx         # Unified shopping bag, catalog & backend sync state
│   ├── App.jsx                     # Route declarations, scroll-to-top, & toast alerts
│   ├── main.jsx                    # React 19 root bootstrap
│   └── index.css                   # Tailwind CSS v4 & custom design tokens
├── package.json
└── vite.config.js
```

---

## ✦ Homepage Sections (In Order)

1. **A. Announcement Bar**: Slim top announcement bar with rotating brand messages, new festive collections, and atelier announcements.
2. **B. Premium Navbar**: Features the AIAXOM logo, desktop navigation, expandable 7-category mega-menu (Muga Silk, Eri Silk, Paat Silk, Sarees, Bridal Couture, Occasion Wear, Ready-to-Wear), search bar overlay, private client icon, shopping bag counter, and responsive mobile drawer.
3. **C. Full-Screen Hero**: Editorial hero with large Assamese silk photography, collection label, *"Woven by Heritage. Defined by Elegance."* headline, supporting narrative, and dual action buttons.
4. **D. Signature Collections**: Section titled *"Signature Expressions"* featuring four image-led cards:
   - *Muga Silk — The Golden Heritage*
   - *Eri Silk — The Art of Natural Comfort*
   - *Paat Silk — The Beauty of Fine Weaves*
   - *Bridal Couture — Made for Your Most Precious Moments*
5. **E. Featured Collection**: Section titled *"Curated in Silk"* with silk category filter tabs, product cards, INR prices, size selectors, and Add to Bag buttons.
6. **F. Craftsmanship Storytelling**: Section titled *"The Soul of Assamese Craft"* diving into wild Muga, Ahimsa Eri, and royal Paat, Sualkuchi fair-trade guilds, and an *"Explore Our Heritage"* CTA.
7. **G. Bridal and Occasion Wear**: High-fashion bridal editorial featuring imperial Paat & Muga ensembles, loom-hours statistics, and a *"Book a Custom Consultation"* trigger.
8. **H. Lookbook Gallery**: Editorial asymmetric grid with varied image sizes, hover overlays, and an interactive full-resolution lightbox viewer.
9. **I. Brand Philosophy**: Section titled *"Tradition, Reimagined"* communicating how 600-year-old Assamese textile traditions are sculpted into contemporary luxury.
10. **J. Newsletter**: Minimalist subscription box with live client-side email format validation and success message.
11. **K. Premium Footer**: Brand philosophy, 7-category shop links, craftsmanship links, Sualkuchi & New Delhi flagship addresses, phone, social links, and legal notices.

---

## ✦ How to Run the Project (Frontend + FastAPI Backend)

### 1. Start the React 19 Frontend
Open a terminal in the project directory:

```powershell
cd "C:\Users\ajaye\.gemini\antigravity\scratch\aiaxom-silk-boutique"
npm install
npm run dev
```

Frontend runs on **`http://localhost:5173/`**.

---

### 2. Start the Python FastAPI Backend
Open a separate terminal in the backend directory:

```powershell
cd "C:\Users\ajaye\.gemini\antigravity\scratch\aiaxom-silk-boutique\backend"
pip install -r requirements.txt
python run.py
```

Backend runs on **`http://localhost:8000`**.
- **Interactive Swagger Docs**: **`http://localhost:8000/docs`**
- **Health & Supabase Diagnostics**: **`http://localhost:8000/api/health`**

---

### 3. Connect Supabase (PostgreSQL)

1. Create a project at [https://supabase.com](https://supabase.com).
2. Go to the **SQL Editor** tab in your Supabase dashboard.
3. Paste and run the entire contents of `backend/supabase_schema.sql` (creates tables `products`, `consultations`, `orders`, `users`, sets RLS policies, and inserts seed data).
4. Copy your Supabase Project URL and API Key from **Project Settings** → **API**.
5. Create a `backend/.env` file:
   ```env
   SUPABASE_URL=https://your-project.supabase.co
   SUPABASE_KEY=your-supabase-anon-or-service-role-key
   PORT=8000
   ```
6. Restart the backend: `python run.py`.
7. The Admin console at `http://localhost:5173/admin` will immediately reflect:  
   `FastAPI Online : Supabase PostgreSQL`!

> **Note**: If Supabase credentials are omitted, the backend runs in **In-Memory Resilience Mode** with all 12 Assamese silk garments preloaded and fully functional. No crashes or disruptions!

---

## ✦ Client-Side Interactive Features Tested

- **Cart Persistence**: Items added to the bag are saved in browser `localStorage` and persist through page reloads.
- **Cart Calculations**: Real-time quantity adjustments (`+` / `-`), removals, subtotal calculation, and promo code support (try `HERITAGE10`).
- **Mega-Menu**: Hovering over "Shop" in the desktop navigation expands the full 7-category mega-menu.
- **Search System**: Typing into the search bar or clicking any category pre-filters the `/shop` catalog.
- **Consultation Modal**: Accessible from the navbar, bridal pages, and product pages with live input validation and appointment reference generation (`AX-BR-XXXXXX`).
- **Atelier Admin Dashboard (`/admin`)**:
  - **Overview**: Real-time stats on catalog count, bespoke inquiries, client orders, and Sualkuchi active looms.
  - **Catalog CRUD**: Search, filter, edit prices/descriptions, delete pieces, or add new masterworks with photo presets.
  - **Bespoke Appointments Manager**: Track and update status of bridal consultations (*New* -> *In Discussion* -> *Loom Assigned* -> *Completed*).
  - **Client Orders Tracker**: View customer delivery addresses, line items, totals, and update dispatch stages.
  - **Sualkuchi Loom Registry**: View active heritage guilds and fair-wage compliance.
- **Private Client & Admin Authentication (`/login` & `/logout`)**:
  - **Patron Client Login**: One-click demo credentials (`patron@aiaxom.com` / `patron123`) grants access as *Maharani Priyadarshini Barooah* (Ahom Gold Guild Patron).
  - **Atelier Administrator Login**: One-click demo credentials (`admin@aiaxom.com` / `admin123`) grants access as *Curator Hemanta Saikia* (Atelier Master Admin) and redirects directly to `/admin`.
  - **Interactive Registration Tab**: Simulates new patron registration with name, email, phone, and password.
  - **Session Persistence**: Login state is saved in `localStorage` (`aiaxom_user`) and reflected in the top navbar and profile cards.
  - **Serene Logout Page (`/logout`)**: Concludes user session with a traditional Assamese silk blessing and options to sign in again or explore the boutique.
- **Zero Backend**: All data is local, editable in `src/data/products.js` and `src/data/collections.js`. No APIs or databases required.
