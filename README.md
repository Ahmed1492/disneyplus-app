# Disney+ Clone

A full-featured Disney+ streaming platform clone built with **React.js** and **Tailwind CSS**. Premium cinematic UI with real search, authentication, video player popups, and full content browsing across movies, series, and originals.

> Built by **Ahmed Mohamed**

---

## Live Demo

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

---

## Screenshots

| Page | Description |
|---|---|
| 🏠 Home | Hero slider with Watch Now & Trailer popups + brand logos |
| 🎬 Movies | Browse by category with draggable carousels |
| 📺 Series | Browse TV series with episode sections |
| ⭐ Originals | Disney Originals section |
| 🎥 Single Movie | Full details — cast, reviews, awards, trivia, production info |
| 📡 Single Series | Full details — episodes, cast, reviews, series info |
| 🔍 Search | Real-time search with filters + pagination |
| 🔐 Login | Glassmorphism auth page |
| 📝 Register | Glassmorphism register page |
| 👤 Profile | Tabbed profile — account info, favorites, security |
| ❤️ Favorites | Saved movies and series |

---

## Features

### 🎬 Hero Slider
- Fullscreen auto-playing slider with crossfade transitions
- **Watch Now** button opens a cinematic video player popup
- **Watch Trailer** button opens a separate trailer popup
- Progress dots navigation + arrow controls
- Movie metadata: rating, year, HD badge, description
- Brand logos bar: Disney, Pixar, Marvel, Star Wars, National Geographic with hover effects

### 🎥 Video Player Popup
- Cinematic modal with gradient glowing border
- Autoplay YouTube embed
- "NOW PLAYING" live indicator with pulsing red dot
- ESC key or click outside to close
- Smooth scale + fade animations
- Body scroll lock while open

### 🎞️ Movie & Series Cards
- Poster cards with aspect ratio 2:3
- Hover: scale up, lift, glow shadow, cyan border
- Rating badge (color-coded: green/yellow/red)
- Favorites toggle (heart → checkmark)
- Watch Now button slides up on hover
- Shimmer sweep effect

### 📄 Single Movie Page
- Full-screen hero backdrop with gradients
- Genre tags with gradient pills
- Stats grid with icons (rating, release, votes, language, runtime)
- **Cast & Crew** section with photo cards
- **Production Details** — director, writers, producers, studio, budget, box office
- **Awards & Recognition** — golden award cards
- **User Reviews** — avatar initials, star ratings, dates
- **Did You Know?** — trivia facts with numbered badges
- **Similar Movies** and **More Like This** carousels

### 📺 Single TV Show Page
- Same premium layout as Single Movie
- **Episodes** section with Seasons component
- **Voice Cast** section with avatar placeholders
- **Series Information** — creators, studio, seasons, episodes, runtime
- **User Reviews** section
- Genre tags and stats grid

### 🔍 Search Page
- Real-time search — updates URL query param as you type (`/search?q=...`)
- Searches across **all mock data**: 4 movie categories + 4 series categories
- **Filter tabs**: All / Movies / Series with live counts
- **Pagination**: 18 items per page with smart ellipsis (`1 ··· 4 5 6 ··· 12`)
- Page info: "Page 2 of 5 (19–36 of 87)"
- Prev / Next buttons + numbered page buttons
- Auto scroll to top on page change
- Reset to page 1 on query/filter change
- No query → shows **Trending Now** (top 12 by rating)
- No results → friendly empty state

### 🔐 Authentication (localStorage)
- **Register** — saves user to `localUsers` array in localStorage
- **Login** — checks backend first, falls back to `localUsers` offline
- JWT-style mock token stored as `dToken`
- Works fully offline / demo mode — register then login without a backend
- Auto-redirect if already logged in
- Show/hide password toggle
- Enter key to submit
- Animated loading spinner

### 👤 Profile Page
- **3 tabs**: Account Info · My Favorites · Security
- Hero card with gradient avatar (click to cycle 4 color themes)
- Stats: total favorites, movies saved, series saved
- **Account Info tab** — inline editable fields, save confirmation toast
- **Favorites tab** — split into Movies and Series sections, remove on hover
- **Security tab** — password, 2FA, sessions, danger zone
- Sign Out button

### 🧭 Navbar
- Fixed with scroll blur effect
- Active link underline animation
- **My Favorites** link (visible when logged in)
- Search bar with expand animation
- Profile dropdown with avatar, account info, favorites, sign out
- Mobile hamburger menu with full navigation
- Auth-aware: shows Sign In button or profile dropdown

### ❤️ Favorites
- Persisted in localStorage
- Toggle from any card across the entire app
- Visible in Profile page split by Movies / Series
- Remove button on hover

### 🦶 Footer
- Disney+ logo + tagline
- Navigation links
- Legal links
- Newsletter email input
- Social media icons
- Copyright: © Ahmed Mohamed

---

## Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| React | 19 | UI framework |
| React Router | v7 | Client-side routing |
| Tailwind CSS | v3 | Utility-first styling |
| Axios | latest | HTTP requests |
| React Icons | v5 | Icon library |
| TMDB Mock Data | — | Movie/series JSON data |

---

## Project Structure

```
src/
├── components/
│   ├── Navbar.jsx            # Navigation — auth, search, favorites, mobile menu
│   ├── Slider.jsx            # Hero slider with video popup modal
│   ├── DraggableSlider.jsx   # Movie/series card carousel with pagination
│   ├── DisneyOriginals.jsx   # Originals section
│   ├── SimilarSection.jsx    # Similar content rows
│   ├── Seasons.jsx           # TV show episodes component
│   ├── SearchBar.jsx         # Search input component
│   ├── SingleSliderMovies.jsx
│   └── Footer.jsx            # Footer with links, newsletter, copyright
├── pages/
│   ├── Hero.jsx              # Home page
│   ├── Movies.jsx            # Movies browse page
│   ├── Series.jsx            # Series browse page
│   ├── Originals.jsx         # Originals page
│   ├── SingleMovie.jsx       # Movie detail — cast, reviews, awards, trivia
│   ├── SingleTvShow.jsx      # TV show detail — episodes, cast, reviews
│   ├── Search.jsx            # Real search with filters + pagination
│   ├── Login.jsx             # Glassmorphism login with localStorage auth
│   ├── Register.jsx          # Glassmorphism register with localStorage auth
│   ├── Profile.jsx           # Tabbed profile page
│   └── Favorites.jsx         # Saved favorites page
├── data/                     # Static mock data helpers
├── mocks/                    # TMDB mock JSON data
│   ├── MOVIE/
│   │   ├── Now Playing.json
│   │   ├── Popular.json
│   │   ├── Top Rated.json
│   │   └── Upcoming.json
│   └── TV SERIES/
│       ├── Airing Today.json
│       ├── On The Air.json
│       ├── Popular.json
│       └── Top Rated.json
└── utils/
    └── image.js              # TMDB image URL helper
```

---

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/disney-plus-clone.git
cd disney-plus-clone

# Install dependencies
npm install

# Start development server
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Deployment to Vercel

Pre-configured with `vercel.json` — handles client-side routing and ignores build warnings.

### Option 1 — Vercel Dashboard (recommended)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) → **New Project**
3. Import your GitHub repository
4. Build settings are auto-detected from `vercel.json`:
   - **Build Command:** `CI=false npm run build`
   - **Output Directory:** `build`
5. Click **Deploy** ✅

### Option 2 — Vercel CLI

```bash
npm i -g vercel
vercel        # preview
vercel --prod # production
```

### Notes
- `CI=false` in the build command prevents warnings from failing the build
- `vercel.json` rewrites all routes to `index.html` for React Router support
- No environment variables required

---

## Available Scripts

```bash
npm start          # Start development server on localhost:3000
npm run build      # Build for production (warnings ignored)
npm test           # Run test suite
```

---

## License

This project is for educational and portfolio purposes only.  
Disney+, Marvel, Pixar, Star Wars, and National Geographic are trademarks of The Walt Disney Company.

---

© 2025 Built by **Ahmed Mohamed**
