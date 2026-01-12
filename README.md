# Footparadise Website

A single-page static website for Footparadise - an independent artist specializing in foot-focused illustrations and comics.

## Features

- ✅ **Age Verification Modal** - 18+ verification before entering the site
- ✅ **Responsive Design** - Works on desktop, tablet, and mobile
- ✅ **Multiple Pages** - Home, Commission, App, Info (single-page navigation)
- ✅ **Art Gallery Carousel** - Interactive carousel with floating images
- ✅ **Commission Form** - Email form with Formspree integration
- ✅ **Social Links** - Patreon and Twitter/X integration
- ✅ **Professional Footer** - Links, copyright, and CTA button

## Pages

1. **Home** - Welcome page with hero section, art gallery carousel, and CTA
2. **Commission** - Form to request custom artwork
3. **App** - Download page with Mediafire link (orange background)
4. **Info** - About the artist with social media links

## Setup Formspree (Required for Form Submissions)

The commission form requires Formspree to send emails. Follow these steps:

1. Go to [formspree.io](https://formspree.io) and create a free account
2. Create a new form and copy your form ID (looks like `xyzabc123`)
3. Open `index.html` and find this line:
   ```html
   action="https://formspree.io/f/YOUR_FORM_ID"
   ```
4. Replace `YOUR_FORM_ID` with your actual form ID:
   ```html
   action="https://formspree.io/f/xyzabc123"
   ```
5. Also update the same ID in `script.js`:
   ```javascript
   FORMSPREE_URL: "https://formspree.io/f/xyzabc123"
   ```

**Note:** If Formspree is not configured, the form will fall back to opening the user's email client.

## Deployment to GitHub Pages

### Option 1: Direct Upload
1. Create a new GitHub repository
2. Upload all files from this folder to the repository root:
   - `index.html`
   - `styles.css`
   - `script.js`
   - `imagenes/` folder with your images
3. Go to Settings → Pages
4. Select "Deploy from a branch" → "main" → "/ (root)"
5. Save and wait for deployment

### Option 2: Using Git
```bash
# Clone your repository
git clone https://github.com/YOUR_USERNAME/YOUR_REPO.git
cd YOUR_REPO

# Copy the website files
cp -r /path/to/FootParadiseWeb/* .

# Push to GitHub
git add .
git commit -m "Initial website upload"
git push origin main
```

## Customization

### Update Links (Already configured)
- Patreon: `https://www.patreon.com/c/foot_paradise`
- Twitter/X: `https://x.com/FootParadiseArt`
- Mediafire: Update in `index.html` (search for `mediafire.com`)
- Email: `drawingspirit.videos@gmail.com`

### Add Gallery Images
Edit the `galleryImages` array in `script.js`:
```javascript
const galleryImages = [
    {
        id: 1,
        src: "imagenes/your-image.jpg",  // or full URL
        alt: "Image description"
    },
    // Add more images...
];
```

### Change Colors
Edit the CSS variables in `styles.css`:
```css
:root {
    --color-primary: #ff1a6c;    /* Pink/Magenta */
    --color-secondary: #ff8c1a;  /* Orange */
    --color-orange: #ff8c1a;     /* Navbar color */
}
```

## File Structure
```
FootParadiseWeb/
├── index.html      # Main HTML file
├── styles.css      # All styles including carousel
├── script.js       # Navigation, carousel, and form logic
├── imagenes/       # Images folder
│   └── personaje.jpg
└── README.md       # This file
```

## Browser Support
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## License
© 2024 Footparadise. All rights reserved.
