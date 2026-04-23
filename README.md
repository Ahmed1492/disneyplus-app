# Disney+ Clone

A full-featured Disney+ streaming platform clone built with React.js and Tailwind CSS. Stream movies, TV series, and Disney Originals with a premium, cinematic UI.

> Built by **Ahmed Mohamed**

---

## Live Demo

Deploy to Vercel with one click:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

---

## Features

- **Hero Slider** — Auto-playing fullscreen slider with Watch Now & Trailer video popups
- **Movies & Series** — Browse Now Playing, Popular, Top Rated, and Upcoming content
- **Disney Originals** — Dedicated originals section
- **Single Movie Page** — Full details with cast, reviews, awards, trivia, and production info
- **Single TV Show Page** — Full details with episodes, cast, reviews, and series info
- **Video Player Popup** — Cinematic modal player for trailers and content
- **Authentication** — Register and Login with JWT token support
- **My Favorites** — Save and manage favorite movies and series
- **Search** — Search across all content
- **User Profile** — Account management
- **Brand Logos** — Disney, Pixar, Marvel, Star Wars, National Geographic
- **Responsive Design** — Fully responsive across all screen sizes
- **Glassmorphism UI** — Premium dark theme with blur effects and gradients

---

## Tech Stack

| Technology | Purpose |
|---|---|
| React 19 | UI framework |
| React Router v7 | Client-side routing |
| Tailwind CSS v3 | Styling |
| Axios | HTTP requests |
| React Icons | Icon library |
| TMDB API (mock) | Movie/series data |

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

## Project Structure

```
src/
├── components/
│   ├── Navbar.jsx          # Navigation with auth, search, favorites
│   ├── Slider.jsx          # Hero slider with video popup
│   ├── DraggableSlider.jsx # Movie/series card carousel
│   ├── DisneyOriginals.jsx # Originals section
│   ├── SimilarSection.jsx  # Similar content rows
│   ├── Seasons.jsx         # TV show episodes
│   ├── SearchBar.jsx       # Search component
│   ├── SingleSliderMovies.jsx
│   └── Footer.jsx          # Footer with links and newsletter
├── pages/
│   ├── Hero.jsx            # Home page
│   ├── Movies.jsx          # Movies browse page
│   ├── Series.jsx          # Series browse page
│   ├── Originals.jsx       # Originals page
│   ├── SingleMovie.jsx     # Movie detail page
│   ├── SingleTvShow.jsx    # TV show detail page
│   ├── Login.jsx           # Login page
│   ├── Register.jsx        # Register page
│   ├── Profile.jsx         # User profile
│   └── Favorites.jsx       # Saved favorites
├── data/                   # Static mock data
├── mocks/                  # TMDB mock JSON data
│   ├── MOVIE/
│   └── TV SERIES/
└── utils/
    └── image.js            # Image URL helper
```

---

## Deployment to Vercel

This project is pre-configured for Vercel deployment with `vercel.json` handling client-side routing.

### Option 1 — Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Deploy to production
vercel --prod
```

### Option 2 — Vercel Dashboard

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) and click **New Project**
3. Import your GitHub repository
4. Set the following build settings:
   - **Framework Preset:** Create React App
   - **Build Command:** `npm run build`
   - **Output Directory:** `build`
5. Click **Deploy**

### Environment Variables

No environment variables are required for the base deployment. The app uses mock data and a public API endpoint.

---

## Available Scripts

```bash
npm start        # Start development server
npm run build    # Build for production
npm test         # Run tests
```

---

## Screenshots

| Page | Description |
|---|---|
| Home | Hero slider + content rows |
| Movies | Browse all movies by category |
| Series | Browse all TV series |
| Single Movie | Full movie details with cast & reviews |
| Single Series | Full series details with episodes |
| Login / Register | Premium glassmorphism auth pages |
| Favorites | Saved movies and series |

---

## License

This project is for educational purposes only. Disney+, Marvel, Pixar, Star Wars, and National Geographic are trademarks of The Walt Disney Company.

---

© 2025 Built by **Ahmed Mohamed**
