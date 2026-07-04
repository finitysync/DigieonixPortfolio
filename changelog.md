# Changelog

All notable changes to this project will be documented in this file.

## [2026-07-02]
### Added
- Admin dashboard mein `About`, `Privacy`, aur `Terms` pages ko edit karne ke naye tabs aur forms add kiye hain taake website ka sara content backend se manage ho sake.
### Fixed
- Fixed empty FAQ section in the Pricing page by correctly mapping the `faq.q` and `faq.a` data properties from the backend content configuration.
### Changed
- `About.jsx`, `Privacy.jsx`, aur `Terms.jsx` se hardcoded content hata kar usko `content.json` ke through dynamic banaya gaya hai.
- Started the frontend (Vite) and backend (Express) development servers for preview.

## [2026-07-01]
### Added
- Added an Auto-Responder email system that instantly sends a "Thank You" email to users when they submit a lead.
- Implemented a Bulk Email / Newsletter feature in the Admin Dashboard to send broadcast emails to all leads.
- Added Real-Time Push Notifications (via Socket.io) to the Admin Dashboard for new lead submissions, complete with a notification sound.
### Changed
- Improved the Portfolio page UI by adding 3D Parallax Tilt hover effects to the project cards and Magnetic cursor effects to the filter buttons. Also enhanced the project details modal with a premium glassmorphism design.
- Started the frontend (Vite) and backend (Express) development servers for preview.

## [2026-06-29]
### Added
- Added "Our Process" timeline and "Why Choose Us" Bento Grid sections to the Home page for a more premium look.
- Enhanced the "Our Process" section with glowing animations, dynamic hover effects, and modern Lucide icons.
### Fixed
- Fixed a syntax error (missing closing brace) in `backend/routes/auth.js` which prevented the server from starting.
### Changed
- Started the frontend and backend development servers.

## [2026-06-26]
### Changed
- Started the frontend (Vite) and backend (Express) development servers.
