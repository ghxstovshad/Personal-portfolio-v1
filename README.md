# Rashad — Portfolio

## Project Structure

```
rashad-portfolio/
├── index.html       — main HTML structure
├── style.css        — all styles and variables
├── script.js        — scroll reveal animation
├── assets/          — create this folder for images
│   ├── peeps-1.png
│   ├── peeps-2.jpeg
│   ├── peeps-3.jpeg
│   └── suiball-*.png  (add content screenshots here)
└── README.md
```

## Adding Images

1. Create an `assets/` folder in the project root
2. Add your Peeps visuals named: `peeps-1.png`, `peeps-2.jpeg`, `peeps-3.jpeg`
3. For Suiball content screenshots, replace the placeholder divs in index.html:

```html
<!-- Replace this -->
<div class="placeholder-box"><div class="ph-icon">📸</div><span>Post screenshot</span></div>

<!-- With this -->
<div class="gallery-item"><img src="assets/suiball-post-1.png" alt="Suiball post"/></div>
```

## Hosting

Easiest free options:
- **Vercel** — drag and drop the folder, done
- **Netlify** — same, drag and drop
- **GitHub Pages** — push to repo, enable Pages in settings
