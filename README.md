# Warren Lim | Premium Finance Portfolio

A high-performance personal landing page for a penultimate Banking & Finance undergraduate at Nanyang Technological University (NTU). Built with a "Clean Minimalism" aesthetic and Apple-standard UX design.

## 🚀 Key Features

- **Strategic Storytelling**: Quantified, results-driven professional narrative tailored for Investment Banking, Asset Management, and Strategy recruitment.
- **Side-by-Side Hero**: A sophisticated entrance featuring a large profile card ($380 \times 480\text{px}$) with depth shadows and verified contact integration.
- **Immersive PDF Portfolio**: Interactive "Work" section utilizing `AnimatePresence` to launch full-screen modal viewers for investment decks and equity research.
- **Technical Credentialing**: Dedicated "Technical Toolkit" section showcasing FMVA® certification, Bloomberg credentials, and verified modelling skills.
- **Seamless Asset Sync**: Fully integrated local files (Resume, Headshot, Impact Icons, Achievement Photos).

## 🛠️ Components & Architecture

| Component | Responsibility | Design Pattern |
| :--- | :--- | :--- |
| `Hero.tsx` | Identity & Core Stats | Split Layout / Depth Cards |
| `Experience.tsx` | Quantified Career Timeline | Minimal Vertical Timeline |
| `TechnicalToolkit.tsx` | Verified Skills & Certs | High-Density Feature Grid |
| `CaseCompetition.tsx` | Team Achievements | Visual Social Proof |
| `Projects.tsx` | Interactive Deal/Project Portfolio | Large Hover-Trigger Cards |
| `ResumeViewer.tsx` | CV Review & Distribution | Document Preview Sync |

## 📦 Asset Management (Locally Synced)

The following files were uploaded and are directly mapped in the application:

- **Identity**: `headshot.jpg`, `email-icon.png`, `linkedin-icon.png`, `phone-icon.png`.
- **Achievements**: `win-1.jpg`, `win-2.jpg` (Team Omicron).
- **Documents**: `resume.pdf`, `acesis-deck.pdf`, `sunway-deck.pdf`.
- **Thumbnails**: `acesis-icon.png`, `sunway-icon.png`.

## ⚙️ How to Update Content

The app is built for maximum maintainability. **90% of updates** should be done in a single file:

1.  Open **`src/constants.ts`**.
2.  Edit the strings for tagged data (GPA, transaction volume, descriptions).
3.  Update file paths if you upload new versions of your resume or decks.

## 🎨 Theme Specifications

- **Background**: `#FBFBFD` (Clean White)
- **Primary Ink**: `#0F3057` (Deep Navy)
- **Accent**: `#C4964D` (Strategic Gold)
- **Motion**: Custom `SPRING_UI` and `revealVariants` in `src/lib/animations.ts`.

## 📓 Development Journal

### [2026-04-20 06:51 UTC] - Asset Isolation & Verification
- **Project Refinement**: Scaled down the "Work" section to focus exclusively on verified documents. Removed placeholder entries (*Sheng Siong*, *SGMW*) until physical files are provided to maintain 100% recruiter credibility.
- **Naming Alignment**: Renamed projects in `src/constants.ts` to their full formal titles (*Acesis Welfare And Reward Drivers ETF* and *Sunway Healthcare Holdings Berhad*).
- **Custom Iconography**: Synchronized the project grid to use custom uploaded icons (`acesis-icon.png` and `sunway-icon.png`) instead of generic placeholders.
- **Journalization**: Established a mandatory journaling protocol in `README.md` to track all iterative changes for future AI handovers.

### [2026-04-20 06:54 UTC] - Premium Animation Overhaul
- **Global Motion Library**: Introduced `SPRING_PREMIUM`, `slideUpVariants`, and `floatAnimation` in `animations.ts` for professional-grade timing and physics.
- **3D Interaction**: Created a custom `AnimatedCard` component utilizing `useMotionValue` and `useTransform` for immersive 3D tilt effects on recruitment-critical assets.
- **Hero Revamp**: Implemented scroll-linked parallax for the identity block, floating generative background elements, and staggered typography reveals.
- **Dynamic Timeline**: Upgraded the *Professional History* section with an animated motion-path timeline and staggered item entrances for a high-standard scroll experience.
- **Interactive Deal Grid**: Wrapped project case studies in 3D tilt containers and implemented staggered grid reveals with depth-based hover states.
- **Visual Parallax**: Integrated scroll-linked vertical parallax for team achievement photography in the *Case Competition* section.

### [2026-04-20 06:55 UTC] - Asset Migration & Resume Viewer Fix
- **Architecture Normalization**: Migrated all root-level assets (`.pdf`, `.png`, `.jpg`) into the `/public` directory. This aligns with Vite's static asset serving requirements, resolving the "blocked" content issue caused by 404 path errors.
- **Resume Viewer Stabilization**: Verified the pathing in `ResumeViewer.tsx` to ensure the embedded PDF is correctly pulled from the public bucket.
- **Sync Integrity**: Maintained all custom naming conventions while moving files to preserve the recruitment-focused narrative.

### [2026-04-20 06:56 UTC] - Visual Refinement & Framing
- **Hero Optimization**: Removed the status badge ("Available for Summer '26") from the identity card to ensure an unobstructed view of the professional headshot.
- **Gallery Reshaping**: Standardized the *Case Competition* imagery to a permanent **16:10 Landscape** aspect ratio. 
- **Cropping Fix**: Removed vertical parallax movement from the team photos to prevent dynamic cropping, ensuring the collaborative achievements are fully visible and engaging.

### [2026-04-20 06:59 UTC] - Professional Credentials & Certification Hub
- **CFI Curriculum Strategy**: Engineered a dedicated *Verified Credentials* section, grouping academic certificates by the Corporate Finance Institute (CFI) curriculum path (Foundations, Core, Specialized).
- **FMVA® Spotlight**: Implemented a "Highlight" state for the final FMVA® designation, ensuring it commands visual attention as the capstone achievement.
- **Landscape Gallery Controller**: Built a landscape-oriented slider with active group pagination and navigation controls (Arrows + Indicators) for seamless scrolling through certification folders.
- **Interactive Assets**: Integrated direct "View Asset" links for each certificate entry to facilitate instant recruiter verification.

### [2026-04-20 07:00 UTC] - Landscape Portfolio & Immersive Previews
- **Expansive Portfolio Board**: Redesigned the *Active Case Portfolio* from a vertical grid to a landscape row-based architectural layout. This emphasizes the technical depth of each deck and provides high visual impact on large displays.
- **Immersive Fullscreen Engine**: Engineered `ImageOverlay.tsx`, a reusable high-performance component for fullscreen media previews.
- **Micro-Interaction (Team Success)**: Enabled clickable "Zoom" interaction for Omicron team achievement photos, allowing recruiters to inspect documentation in full-screen mode.
- **Micro-Interaction (Credentials)**: Applied the immersive preview to the *Verified Credentials* hub. Tapping any certificate now triggers a high-fidelity modal view with a click-to-exit gesture.
- **Universal Responsiveness**: Optimized all sections for consistent performance across high-resolution laptops, tablets, and mobile devices using fluid grid logic and adaptive typography.

### [2026-04-20 07:03 UTC] - Stack-Based Categorization & Multi-Device Sync
- **Architectural Certification Hub**: Redesigned the *Verified Credentials* section into a "Stack-and-Expand" model.
    - **Featured Credibility**: Dedicated the primary hero slot to the FMVA® designation for instant recruiter recognition.
    - **Physical Stacks**: Implemented visual card stacks for secondary categories (Bloomberg, CFI Foundations). Clicking a stack expands it into a high-fidelity horizontal curriculum browser.
- **Universal Cross-Device Logic**: Performed a global audit of the Hero and Projects sections.
    - **Viewport Anchoring**: Adjusted typography scaling (`text-3xl` to `text-6xl`) and container widths to ensure identical visual quality from mobile browsers to ultra-wide displays.
    - **Asset Framing**: Optimized headshot and deck thumbnails to prevent collision on smaller laptop screens (13-inch variants).
- **Expansion Micro-Interactions**: Enhanced the modal expansion with spring-based physics and backdrop-blur-3xl for a high-end, immersive feel.

### [2026-04-20 07:05 UTC] - PDF Engine & UX Polish
- **Hybrid Preview Engine**: Upgraded `ImageOverlay.tsx` to a hybrid model that intelligently detects file extensions. PDFs are now rendered via a secure high-fidelity iframe with toolbar suppression, preventing the "image crash" when viewing research decks or certificates.
- **Micro-Interaction Refinement**:
    - **Cursor Logic**: Standardized "Pointer" cursor across all interactive imagery (Omicron and Certs) to replace the magnifying glass, providing a more intuitive "clickable" feel.
    - **UI Cleanup**: Removed the "Tap to exit" instruction from the enlarged view for a cleaner, gallery-style aesthetic.
- **Typography Upscaling**: Significantly increased the scale and weight of gold category tags and section labels in the *Active Case Portfolio* for superior legibility.

### [2026-04-20 07:07 UTC] - Immersive Document Preview Aesthetic
- **Glass Document Redesign**: Re-engineered all certificate cards (Featured, Stacks, and Modals) with a "Glass Document" aesthetic.
    - **Physical Mockup Backing**: Integrated a stylized, high-transparency document mockup (borders, seals, lines) into the background of every card. This provides a visual cue of the document "itself" underneath the UI layer.
    - **High-Contrast Foregrounds**: Leveraged Navy and Gold typography with serif italic accents for an "Old World" prestige feel combined with modern "Glassmorphism."
- **Layered Stacks**: Applied the document preview logic to the physical folder stacks, ensuring consistency in the curriculum browser.
- **Enhanced Legibility**: Standardized text weights and background blurs to ensure that while the "certificate itself" is visible in the background, the primary text remains perfectly readable.

### [2026-04-20 07:11 UTC] - Architectural Categories & Interactive Stacks
- **Three-Tiered Credential Restructuring**:
    1. **CFI® Pathway**: Centralized FMVA® as the primary visual, with an inline "Curriculum Cycle" button to reveal prerequisite certifications (Modeling, Valuation, M&A) without leaving the view.
    2. **Analytical Skills Hub**: Consolidated BAC (Bloomberg Asset Management) as the anchor, integrated with Coursera/BAC pathway cycling logic.
    3. **Bloomberg Specialist Stack**: Engineered a physical 4-layer stack for Bloomberg-specific designations. Implemented a "Layer-Shift" interaction where clicking the right arrow on any layer moves the stack to reveal the next specialized terminal certification.
- **Inline Navigation Engine**: Replaced the modal-based expansion with an "Inline Slide" mechanism. Users navigate within the card itself, maintaining context and engagement on the main page.
- **Data Enrichment**: Integrated high-fidelity placeholders for Coursera (Yale, IBM) and additional Bloomberg certifications to populate the requested 4-layer and BAC/Analytical requirements.

### [2026-04-20] - Certificate Image Fix & Asset Recovery
- **Source Recovery**: Retrieved all 25 original certificate PDFs directly from OneDrive (`2.0 - Career/2.3 - Certificates`) to replace previously corrupted files.
- **JPG Generation**: Converted each PDF to a 1200px-wide JPEG thumbnail using `qlmanage` + `sips` (macOS native tools) — no external dependencies required.
- **File Cleanup**: Removed 52 duplicate certificate files (long-named originals) from the project root; `public/` is now the single source of truth for all static assets.

### [2026-04-20] - UX Polish & Animation Overhaul
- **Page title**: Changed from "My Google AI Studio App" to "Warren's Portfolio" in `index.html`.
- **Landing description**: Updated hero gate text from "Are you interested in knowing me more?" to a friendlier, more energetic line — "A sneak peek into my career, credentials & a little bit of life — click to step inside."
- **Experience animation fix**: Replaced laggy `once: false` scroll re-triggers with `once: true` spring-physics variants (`entryVariants`, `bulletVariants`). Timeline line now uses `scaleY` with a cubic-bezier draw-on instead of a slow 1.5s ease. Bullets slide in from the left with staggered spring delays instead of repeated `whileInView` calls on every scroll pass.

## 💡 Planned Features (Backlog)

### Golf / Personal Interests Video Section
- **Idea**: Add a "Beyond Work" or personal interests section showcasing golf videos.
- **Recommended approach**: Host videos on YouTube (unlisted) and embed via `<iframe>` — avoids GitHub's 100MB file limit and ensures fast loading.
- **To implement**: Share YouTube video links and a section title/description; the section will be built to match the existing portfolio aesthetic.

---
*Created by Warren Lim | Premium Project State: Synced & Verified.*
