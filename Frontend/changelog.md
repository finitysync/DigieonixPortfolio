# Changelog

All notable changes to this project will be documented in this file.

## [1.1.1] - 2026-06-30

### Added (Development)
- Frontend (`npm run dev`) aur backend (`node server.js`) ke development servers ko successfully start kiya local preview environment ke liye.

### Fixed
- **How We Work Section Layout:** `Home.jsx` mein "Our Process" timeline jo vertical aur overlapping the, usko 4-column **horizontal grid** line layout mein tabdeel kiya. Desktop par horizontal line ke saath center-aligned nodes show honge aur mobile par clean vertical layout aayega.

## [1.1.0] - 2026-06-26

### Added
- Digieonix brand theme config set up kiya `theme.js` aur `index.css` me (using Inter font aur brand purple `#b449f6`).
- Shared responsive `Navbar.jsx` build kiya jisme sticky show/hide on scroll direction tracking, brand logo layout, dynamic router links border underlines, desktop hover/click dropdowns, aur mobile drawer accordion settings apply kiye.
- Shared 4-column `Footer.jsx` build kiya featuring top purple border (#b449f6), react-icons social handles, support contact routes, aur bottom rights declarations.
- `react-icons` package install kiya list of icons manage karne ke liye.
- `react-intersection-observer` package install kiya view-based animations logic trigger karne ke liye.
- Services list (`services.js`) update kiya to map Digieonix's 5 core business capabilities.
- Dynamic `Home.jsx` page create kiya following specifications:
  - **Hero**: Full viewport (100vh) display, custom typewriter cursor text loop animation, radial purple glow background, Get Started (filled) & View Our Work (outlined) CTA buttons, and bouncing scroll indicator arrow.
  - **Services Preview**: "What We Do" headings grid displaying first 3 card items with icons representation and "View All Services" redirection route.
  - **Stats Bar**: Full width card (#111111) containing 4 stats count-ups triggered dynamically on scroll viewport entrance.
  - **Testimonials Preview**: "What Clients Say" section presenting 2-column cards grid containing quotes and star ratings.
  - **CTA Banner**: Violet gradient full banner containing consultation CTA trigger mapping to Contact page.
- Detailed `/services` page build kiya containing:
  - **Page Hero Banner**: Dynamic breadcrumb routing ("Home > Services"), header typography, and left-edge ambient purple gradient highlight overlay.
  - **Services 2-column Grid**: 5 large service cards styled with 48px purple vector assets, bold white titles, full paragraphs descriptions, 2x2 grids of 4 features with checkmark markers, and "Get a Quote" CTAs.
  - **Hover Interactions**: Smooth framer-motion spring scale up, border highlights, and box shadow purple glow.
  - **Bottom CTA Banner**: Center-aligned layout redirecting undecided visitors to Contact form.
- Filterable `/portfolio` page build kiya containing:
  - **Page Hero Banner**: Dynamic breadcrumb routing ("Home > Portfolio"), title heading, and project overview subtext.
  - **Filter Tabs**: 5 categories options (All, Meta Ads, Web Development, SEO, Social Media) using purple filled active pills and outlined inactive tabs with AnimatePresence transitions.
  - **Gallery Grid**: 3-col layout for desktop, 2-col for tablet, 1-col for mobile with 6 dynamic items.
  - **Gradient Cards**: Purple-to-black color gradient thumbnails, project name overlays, top-left category badges, and hover dark overlays displaying "View Details".
  - **Details Modal Dialog**: Popup overlay card containing full descriptions, client names, key results/metrics badges, ESC keypress keydown event listener, and background overlay dismiss clickouts.
- Portfolio items data sheet (`portfolio.js`) rebuild kiya with 6 custom marketing and development campaigns.
- Structured `/about` page build kiya containing:
  - **Page Hero Banner**: Title typography, breadcrumb layout tracking ("Home > About Us"), and brand localization subtext.
  - **Story Section**: Split 2-column layout representing text description paragraphs on the left and a stylized dark card with glowing border and centered logo on the right.
  - **Stats Bar Counter**: Viewport entrance triggers dynamic count-up animations for clients, campaigns, years, and services.
  - **Values Grid**: 3-column row featuring "Results First", "Transparency", and "Client Success" cards detailed with vector icons and hover transition animations.
  - **Why Choose Us Section**: Two-column layout presenting bold heading details alongside a 6-item checkpoints list utilizing custom checkmarks.
  - **Bottom CTA Banner**: Violet background redirect mapping undecided users to contact form coordinates.
- Interactive `/pricing` page build kiya containing:
  - **Page Hero Banner**: Title display, breadcrumb tracking ("Home > Pricing"), and pricing scoping subtext.
  - **Pricing Cards Grid**: 5 columns rendering PKR package details (SMM Marketing, SMM Management, Web Dev, SEO, PPC Ads). Each card features service icons from `react-icons/fa`, large price tag values, period tags, and checkmark feature bullets.
  - **Featured Pulse Card**: PPC Ads card features "Most Popular" badge tag, purple outline borders, and a custom CSS keyframe glow pulse animation (`pricing-glow`).
  - **Accordion FAQs**: 5 expandable/collapsible questions using Framer Motion height animators, chevron direction triggers, and helpful answers layouts.
  - **Bottom CTA Banner**: Violet gradient consultation banner redirecting users to the Contact page.
- Validated `/contact` page build kiya containing:
  - **Page Hero Banner**: Title displays, breadcrumb tracking ("Home > Contact"), and response time guarantees subtext.
  - **Two-Column Split Layout**: Form controls on the left (60%) and details panel on the right (40%).
  - **Validated Contact Form**: Full Name, Email, and Message required fields with pink-red alert triggers. Dropdowns for service interests and budgets, phone number input, and simulated 1.5s loading spinners inside the submit button.
  - **Success Alert Card**: Pop-up panel displaying emerald checkmarks, "Message Sent! We'll get back to you within 24 hours.", and a form reset button.
  - **Contact Info Panel**: Dark card (#111111) with a purple left border containing email links, WhatsApp chat triggers, response details, working hours note, and 5 react-icons social buttons.
- Final Polish parameters configure kiye:
  - **Page Transitions**: Wrap components variants ko y 20 to 0 and 0.4s standard loading transitions par enforce kiya.
  - **Scroll To Top**: Solid purple button floating action setup kiya jo scrolling 400px depths par scale-in transitions keyframes se show hota hai.
  - **Active Link Highlight**: useLocation dynamic endpoints tracking mapping coordinate kiya navbar active links text color highlights (`text-[#b449f6]`) aur active inline underlines coordinate karne ke liye.
  - **First Visit Loading Splash**: 1.5s centered loading page transition mask setup kiya jo sessionStorage keys use karke first session load boundaries par visible hota hai.
  - **SEO & OG Head Metadata**: index.html custom headers titles, meta descriptions, og:tags targets, and logos icons updates key coordinates compile kiye.
  - **Performance Code Splitting**: React.lazy lazy loading routes chunks coordinate kiye build sizes reduce aur load times optimization improve karne ke liye.
  - **Drifting Ambient Glows**: Home page hero layout me static bg glow coordinates ko replace karke double drifting elements (`drift-glow-purple` & `drift-glow-cyan`) keyframe cycles run kiye.
  - **Staggered Cards Delay**: Home page services aur testimonials grid cards display flows par `index * 0.1` coordinate delay parameters apply kiye.
  - **Button Hover & Tap Animations**: Saare primary aur outline CTA buttons, filters tabs, aur close modal buttons par interactive scaling transitions `whileHover={{ scale: 1.05 }}` aur `whileTap={{ scale: 0.97 }}` standard parameters configuration apply kiya.

### Fixed (Audit Iteration)
- **Contact Form Backend**: FormSubmit.co API integrate kiya actual leads capture karne ke liye. Failed submissions par error handling add ki.
- **Production Assets**: `favicon.png` aur `logo.png` ko `/public` folder main shift kiya taake production build main broken paths ka issue solve ho, aur `index.html` main OG/Twitter meta tags absolute references setup kiye.
- **Routing & Navigation**: `NotFound.jsx` (404 Error Page) add kiya invalid URLs handle karne ke liye. `Navbar.jsx` dropdown links ko anchor hashes (`#smm-marketing`, etc.) se link kiya for smooth scrolling. Route change hone par automatic scroll-to-top restore setup kiya.
- **Data Consistency**: Footer aur Contact page main email (`info@digieonix.com`) aur WhatsApp (`+923044455618`) details sync kiye. Social media placeholder links ko brand handles se update kiya. `testimonials.js` main brand name "DE Agency" ko "Digieonix" se replace kiya.
- **Component Refactoring**: Duplicate components (`CountUp.jsx`, `ScrollFadeIn.jsx`, `getServiceIcon.jsx`) ko `/src/components` aur `/src/utils` main extract kiya. Unused files (`hero.png`, `react.svg`, `vite.svg`, `theme.js`, `pricing.js` data) remove kiye.
- **SEO Optimization**: `usePageMeta.js` hook create kiya har page ka dynamic `<title>` aur `<meta description>` manage karne ke liye.
- **Mobile Menu UX**: Mobile hamburger menu open hone par background scrolling block karne ke liye `overflow-hidden` apply kiya.

### Added (Team Update)
- Naya `/team` route add kiya "Our Team" page ke liye.
- `team.js` data file create ki 4 placeholder team members (Aslam, Sarah, Ali, Zainab) aur unki details ke sath.
- `Team.jsx` component build kiya containing:
  - Hero section with gradient background elements.
  - 4-column responsive grid featuring team members.
  - Hover effects on member cards revealing social links (LinkedIn, Twitter).
- `Navbar.jsx` aur `App.jsx` main "Our Team" route integrate kiya.

### Changed (Bespoke Service Pages)
- Single generic `/services/:id` dynamic route template ko remove kiya (`ServiceDetail.jsx` deleted).
- 5 completely unique aur bespoke UI layouts create kiye har service ke liye taake vibe distinct feel ho:
  - **`SmmMarketing.jsx`**: Highly visual layout with pink/purple gradients aur custom Instagram mockup cards for engagement rate showcase.
  - **`SmmManagement.jsx`**: Clean, organized 2-column alternating layouts with custom checkmarks aur "Time Saving" statistics.
  - **`WebDevelopment.jsx`**: Technical dark UI theme featuring an infinite scrolling tech-stack marquee (`react`, `nextjs`) aur custom code-snippet IDE mockups.
  - **`SEO.jsx`**: Analytical, data-driven green theme with animated SVG trajectory charts aur "3 Pillars" layout cards.
  - **`PpcExpert.jsx`**: Aggressive ROI-focused red/orange theme with a vertical visual funnel representing Cold/Warm/Hot traffic stages.
- `App.jsx` ko update kiya aur explicit routes map kiye naye components (`/services/smm-marketing`, etc) ke liye.

### Fixed (Brand Color Sync)
- Sab naye bespoke service pages (`SmmMarketing.jsx`, `SEO.jsx`, `PpcExpert.jsx`, etc.) ke custom red/green/orange themes ko hata kar website ki primary brand colors (`#b449f6` primary aur `#22d3ee` cyan) ke sath sync kiya gaya.
- Elements jaise glowing badges, abstract background blurs, aur icons ab consistent brand identity follow kar rahe hain.

### Added (Premium Animations & Micro-Interactions)
- `CustomCursor.jsx` component banaya jo desktop par ek trailing glowing dot render karta hai (`framer-motion` use karke). Default cursor hide kar diya gaya.
- `MagneticElement.jsx` wrapper banaya jo buttons aur links ko hover karne par thora sa cursor ki taraf pull karta hai.
- Global `bg-grain` (noise overlay) aur `ambient-orb` (floating blurred orbs) add kiye `index.css` main aur `App.jsx` main mount kiye taake dark mode mazeed premium lage.
- `Navbar.jsx` aur `CTABanner.jsx` main magnetic elements, animated underlines, aur ripple hover effects shamil kiye gaye.
- `Home.jsx` ke Hero section main Magnetic buttons integrate kiye aur Services preview cards par ek naya 3D Parallax effect (`TiltCard.jsx`) lagaya jo mouse movement track karta hai (premium 3D perspective).
- **Floating WhatsApp Button** add kiya (`FloatingWhatsApp.jsx`) jo website ke bottom-right corner par animated pulse effect ke sath hamesha visible rehta hai, aur direct `03429313239` par pre-filled message ke sath redirect karta hai.

### Changed (Mobile UX)
- Mobile header (Navbar) ko redesign kiya gaya hai: Logo ab absolute center main display ho raha hai aur uska size mobile par thora bara (`h-14`) kar diya gaya hai. Hamburger menu right side par hi rakha hai. Left side wala call button user feedback par remove kar diya gaya.

### Fixed (Logo Import)
- Logo image references ko `../assets/logo.png` se absolute `/logo.png` (public folder) par update kiya across `Navbar.jsx`, `Footer.jsx`, `About.jsx`, aur `App.jsx` components taake uploaded logo correctly render ho.

### Added (Development)
- Local preview server start kiya (`npm run dev`) frontend environment run karne ke liye.

### Added (Backend Setup)
- Backend structure initialize kiya `/backend` directory mein with Express, CORS, JWT, aur Nodemailer.
- Basic routes mount kiye: `/api/auth` (login/token generation), `/api/content` (read/write JSON data), `/api/contact` (email sending via Nodemailer).
- Root endpoint `GET /` add kiya jo "Digieonix API is running..." message return karta hai (taake browser mein 'Cannot GET /' error na aaye).
- `content.json` file create ki as a lightweight database containing initial Digieonix data (hero, services, portfolio, testimonials, etc.).
- `verifyToken` middleware setup kiya for protecting content update endpoints.

### Changed (Backend Routes)
- `auth.js` mein `/api/auth/login` route update kiya for bcrypt password comparison against `ADMIN_PASSWORD_HASH`, aur ek temporary `/api/auth/generate-hash` route add kiya for setup.
- `contact.js` mein `/api/contact` route update kiya taake Nodemailer properly HTML format (with name, email, phone, service, budget, message) mein admin ko emails bhej sake.

### Added (Admin Panel Phase 3)
- Frontend mein `react-hot-toast` package install kiya notifications ke liye.
- `AdminLogin.jsx` (`/admin`): Secure login UI create kiya jo backend se JWT token fetch karke localStorage mein save karta hai.
- `AdminDashboard.jsx` (`/admin/dashboard`): Complete CMS dashboard build kiya jisme fixed dark sidebar, 8 different sections (Hero, Services, Pricing, Portfolio, Testimonials, Contact Info, Social Links, FAQ), aur direct `content.json` updates ke liye PUT requests shamil hain.
- `App.jsx`: `useLocation` hook use karke public components (`Navbar`, `Footer`, `FloatingWhatsApp`, Backgrounds) ko hide kiya jab user `/admin` routes par ho.

### Added (Phase 5: Image Upload System & Branding)
- `backend/server.js`: Multer integration aur naya `POST /api/upload` route banaya jo images ko `backend/public/uploads` mein save karta hai. Static files ko frontend par display karne ke liye `/uploads` path set kiya.
- `ImageUploader.jsx`: Naya React component banaya jo file select karke directly API par bhejta hai aur URL return karta hai.
- `content.json`: `branding` key add ki jismein site logo ki information save hoti hai.
- `AdminDashboard.jsx`: Portfolio items (Project Image) aur Testimonials (Client Avatar) ke liye text input ki jagah `ImageUploader` lagaya. Naya "Branding" tab add kiya jahan se logo upload ho sakta hai.
- `Portfolio.jsx` & `Home.jsx`: Update kiye taake agar `content.json` mein image URL mojud ho toh placeholder ki jagah woh image show ho.
- `Navbar.jsx`, `Footer.jsx` & `AdminLogin.jsx`: Hardcoded logo ki jagah dynamic logo from `ContentContext` (yaani `content.branding.logo`) lagaya gaya.

### Added (Firebase Migration & Real-Time Sync)
- `firebase-admin` aur `firebase` SDK install kiye gaye.
- Backend mein `firebase.js` banaya gaya `serviceAccountKey.json` use karke. Frontend mein `firebase.js` banaya gaya client config use karke.
- `migrateToFirebase.js` script likhi gayi aur successfully chalayi gayi jismein sara `content.json` data Firestore ki `content` collection mein upload kiya.
- `routes/content.js` ko update kiya gaya taake GET aur PUT requests ab seedha Firestore se connect hon.
- `routes/contact.js` update kiya gaya taake leads email ke sath sath Firestore ki `leads` collection mein bhi save hon (`status: "new"` aur `createdAt` timestamp ke sath).
- Naya `routes/leads.js` create kiya gaya for GET all leads aur PATCH lead status updates.
- `routes/upload.js` update kiya gaya taake Multer ke zariye upload hone wali har image ka reference Firestore ki `uploads` collection mein bhi save ho.
- Naya `routes/analytics.js` banaya gaya jo pageviews track karega aur dashboard ke liye summary return karega.
- `ContentContext.jsx` ko update kiya gaya to use Firestore `onSnapshot`, is se ab website ka content real-time mein bina refresh kiye update hota hai.

### Added (Drag and Drop Layout & Item Reordering)
- `@dnd-kit/core`, `@dnd-kit/sortable`, aur `@dnd-kit/utilities` install kiye.
- Admin Panel (`AdminDashboard.jsx`) mein **Page Layout** ka naya tab banaya, jahan admin drag-and-drop se Home page ke sections ka order badal sakta hai.
- `Home.jsx` ko update kiya taake woh `content.layout` array ke order ke hisaab se (dynamically) Hero, Services, Stats, aur Testimonials sections ko render kare.
- **Team**, **Services**, aur **Testimonials** tabs ko bhi sortable banaya taake unke andar ke items ko drag karke manually reorder kiya ja sake.
- Reusable `SortableItem.jsx` component banaya.

### Added (Admin Dashboard - Leads Tab)
- `AdminDashboard.jsx` mein "Leads" (📬) ka ek naya tab banaya gaya hai.
- Ab jab bhi koi website se form submit karta hai, woh seedha admin dashboard mein leads table mein nazar aata hai.
- Leads ka status (New, Contacted, Converted) admin panel se hi update kiya ja sakta hai aur real-time database mein save hota hai.

### Added (Premium UI/UX)
- Home page ke **Hero Section** ke background mein ek premium 3D purple wireframe animation (`Three.js` + `React Three Fiber`) add ki gayi hai.
- Poori website ki color scheme aur styling ko ek rich **"Deep Midnight"** aur **Neon Gradient (Cyan, Purple, Pink)** vibe di gayi hai. Pitch black background ko thora lighter aur classy dark navy/slate mein convert kiya hai.
- Website scroll karne par ab **Parallax Scrolling** hoti hai (background ke colors alag speed se move karte hain) aur cards 3D tareeqe se rotate ho kar (Staggered Animation) samne aate hain.
- **Dynamic Theming Engine:** Ab Admin Dashboard ke "Branding" tab se poori website ke colors (Background, Cards, Primary, Accents) change kiye ja sakte hain bina koi code likhay. Colors change karte hi live preview aur real-time updates milte hain.
- **SEO & Meta Tags Control:** Admin Dashboard ke Branding tab mein ab Site Title, Meta Description, Meta Keywords, aur OG Image (social media share image) edit kar sakte hain. Yeh settings Google search results aur social media shares par show hongi.
- **Favicon Control:** Admin panel se browser tab ka icon (favicon) bhi change kiya ja sakta hai — apni marzi ki image upload karein aur save karein.

### Fixed
- **Services Icons Issue:** Home page aur services section par pehle sabhi services par `< >` (code) ka icon aa raha tha kyu ke purane database identifiers naye icon library (`lucide-react`) se match nahi kar rahe they. Ise theek kar diya gaya hai.

### Security (Full Audit — 12 Issues Resolved)
- 🔴 **CRITICAL:** `/api/auth/generate-hash` route hataya gaya jo bina authentication ke kisi ko bhi password hash generate karne deta tha.
- 🔴 **CRITICAL:** Backend mein `.gitignore` banaya gaya taake `.env`, `serviceAccountKey.json`, aur `node_modules` kabhi git push mein leak na hon.
- 🟠 **HIGH:** JWT Secret ko weak string (`digieonix_super_secret_2025`) se hata kar **128-character cryptographic random key** se replace kiya.
- 🟠 **HIGH:** File upload pe **5MB size limit** lagayi gayi (pehle unlimited tha — DoS attack possible tha).
- 🟠 **HIGH:** `express.json()` pe **1MB body limit** lagayi gayi (pehle unlimited tha — memory bomb attack possible tha).
- 🟠 **HIGH:** Contact form ke user inputs ko **HTML-escape** kiya gaya email template mein inject karne se pehle (XSS/HTML injection fix).
- 🟡 **MEDIUM:** Analytics `/pageview` route pe **dedicated rate limiter** (60 req/min per IP) lagaya gaya (pehle unlimited tha — database spam ho sakta tha).
- 🟡 **MEDIUM:** Global rate limit ko 1000 se wapas **200 requests/15min** par set kiya — production-ready.
- 🟡 **MEDIUM:** Upload URL ab **dynamic** hai (`req.protocol + req.get('host')`) — pehle hardcoded `localhost:5000` tha jo production mein kaam nahi karta.

### Added (Live Analytics)
- `socket.io` aur `socket.io-client` install kiya for real-time WebSockets tracking.
- `backend/server.js`: Server ko `http.createServer` par switch kiya aur `io.on('connection')` logic build ki jo `activeUsers` count track aur broadcast karti hai.
- `Frontend/src/App.jsx`: Global `io('http://localhost:5000')` connection establish kiya taake har visitor session automatically register ho sake.
- `AdminDashboard.jsx`: Sidebar ke oopar ek pulse animation wala emerald badge ("🟢 X Active Visitors") add kiya jo real-time mein web traffic show karta hai without refreshing.

### Added (Phase 4: Frontend-Backend Integration)
- `ContentContext.jsx`: Naya React Context create kiya jo initial load par `http://localhost:5000/api/content` se sara data fetch karta hai.
- `main.jsx`: `App` ko `ContentProvider` se wrap kiya taake poori site ko dynamic data mil sake.
- `Home.jsx`, `About.jsx`, `Services.jsx`, `Portfolio.jsx`, `Pricing.jsx`, `Contact.jsx`, aur `Footer.jsx` ko refactor kiya. Hardcoded strings aur static `src/data/*.js` files ko remove karke sab jagah `useContent()` hook implement kiya. Ab Admin Panel mein ki gayi koi bhi tabdeeli fauran live site par nazar aati hai.

## [1.0.0] - 2026-06-25

### Added
- Vite + React + Tailwind CSS v4 agency project environment configure aur set up kiya.
- Reusable layouts & core components build kiye: Navbar, Footer, ScrollToTop, PageTransition, SectionTitle, aur CTABanner.
- Static data sheets configure kiye under `src/data/` portfolio, pricing, services, aur testimonials list manage karne ke liye.
- Dynamic React pages build kiye:
  - **Home**: Dynamic cards stats panel ke sath, testimonial carousel sliding reviews slider.
  - **Services**: Chronological steps process timeline diagram mapping.
  - **Portfolio**: Real-time category array filter selection framework.
  - **About**: Milestones timeline charts, team layout details, agency core value cards.
  - **Pricing**: Monthly/Yearly package price state switches, toggle FAQs details dropdown accordion heights.
  - **Contact**: Multi-input form logic, secure transmission status success overlay panels, custom SVG global network dots map.
- Modern abstract technology logo image generate kiya aur use `/src/assets/logo.png` route main register kiya.
- SEO structure update kiya HTML template main index tracking improve karne ke liye, custom favicon routes bind kiye.

### Fixed
- PostCSS adapter use kiya package configuration update karke to ensure compile stability with Tailwind CSS v4.
- Lucide React v0.400+ custom icon deprecation issue fix kiya. Brand icons (`Github`, `Twitter`, `Linkedin`, `Instagram`) ko replace kiya manually coded scalable vector inline components se standard styles layout lock-in ke liye.
