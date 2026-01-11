# PRD: Character Archives Website for GitHub Pages

## Overview
A character showcase website inspired by the Zenless Zone Zero design (diseño muestra), featuring a vibrant pink-orange-yellow color palette (papel tapiz). Built for deployment on GitHub Pages.

## Current Status: ✅ COMPLETE

## Features Implemented

### 1. Navigation Bar
- **Items**: Home, List, Agents, Shop, Info
- **Functionality**: All items are clickable and navigate to respective pages
- **Active State**: "Agents" shows with a dot indicator
- **Logo**: E.C.F branding in top right corner
- **Editable**: Configuration in `src/config/siteConfig.js`

### 2. Hero Section
- **Archive Label**: "NEW ERIDU ARCHIVES"
- **Character Code**: "004"
- **Character Name**: "NEKOMIYA MANA" in large Bebas Neue font
- **Description**: Character bio text
- **CTA Button**: "Hire an Agent" - pill-shaped, dark button
- **Character Image**: Placeholder image (editable in config)
- **Decorative Elements**: Vertical stripes beside the name

### 3. Skills Section
- **Dark Background**: Contrasting section with dark theme
- **Section Title**: "Skills" with decorative stripes
- **3 Skill Cards**:
  1. Kitty Slash - Target icon
  2. Super Surprise Attack! - Crosshair icon
  3. Claw Smash - Zap icon
- **Each card**: Icon, title, description

### 4. Footer
- **Logo**: E.C.F branding
- **Copyright**: "© 2024 New Eridu Archives. All rights reserved."
- **Links**: Privacy Policy, Terms of Service, Contact

### 5. Placeholder Pages
- List, Shop, Info pages show "En construcción" message
- "Volver al Inicio" button to return home

## Technical Implementation

### Tech Stack
- React 18
- Tailwind CSS
- React Router (HashRouter for GitHub Pages)
- Lucide React (icons)

### Color Palette (from papel tapiz)
- **Primary (Pink/Magenta)**: HSL 348 100% 55%
- **Secondary (Orange)**: HSL 32 100% 55%
- **Accent (Yellow-Green)**: HSL 70 100% 50%

### Typography
- **Display Font**: Bebas Neue (character names, headings)
- **Body Font**: Inter (descriptions, navigation)

### File Structure
```
frontend/
├── src/
│   ├── config/
│   │   └── siteConfig.js      # ⭐ Main configuration file
│   ├── components/
│   │   ├── Navigation.jsx
│   │   ├── HeroSection.jsx
│   │   ├── SkillsSection.jsx
│   │   └── Footer.jsx
│   ├── pages/
│   │   ├── HomePage.jsx
│   │   └── PlaceholderPage.jsx
│   ├── index.css              # Design tokens & styles
│   └── App.js                 # Routes
├── public/
│   ├── index.html
│   └── 404.html               # GitHub Pages routing fix
├── .github/
│   └── workflows/
│       └── deploy.yml         # GitHub Actions deployment
└── README.md                  # Documentation
```

## How to Customize

### Change Character Image
1. Edit `src/config/siteConfig.js`
2. Update `character.image` with your PNG URL

### Change Colors
1. Edit `src/index.css`
2. Modify CSS variables in `:root`

### Add Navigation Items
1. Edit `src/config/siteConfig.js`
2. Add items to `navigation` array
3. Create corresponding page component
4. Add route in `App.js`

## GitHub Pages Deployment
1. Upload to GitHub repository
2. GitHub Actions will automatically build and deploy
3. Or manually: `yarn build` and upload `build/` folder

## Notes
- Uses HashRouter for GitHub Pages compatibility
- All content is editable via siteConfig.js
- Responsive design (mobile + desktop)
- No backend required - pure frontend
