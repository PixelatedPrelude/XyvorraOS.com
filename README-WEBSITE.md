# XyvorraOS — Website

This is the source for the [XyvorraOS](https://pixelatedprelude.github.io/XyvorraOS.com/) website, hosted on GitHub Pages.

## File structure

```
XyvorraOS.com/
├── index.html           ← Home / landing page
├── features.html        ← Feature list + roadmap
├── themes.html          ← All four color themes
├── download.html        ← Download + install instructions
├── announcements.html   ← News and patch notes
├── gallery.html         ← Screenshots, fan art, mockups
├── community.html       ← Discord, GitHub links, crew code
│
├── css/
│   ├── main.css         ← Shared styles, colors, nav, footer, buttons, cards
│   └── animations.css   ← Star canvas, scroll reveals, shimmer, typing cursor
│
├── js/
│   ├── nav.js           ← Mobile menu, active link detection, scroll shadow
│   └── animations.js    ← Star field, scroll reveal observer, typing effect, count-up
│
└── assets/              ← Drop images, screenshots, and the logo here
```

## How to update things

### Add an announcement
Open `announcements.html`, copy one of the `.announce-card` divs, paste it above the existing ones, update the date and content. Newest post always goes first.

### Add gallery images
1. Drop your image in `assets/`
2. Open `gallery.html`, copy an existing `.gallery-item`
3. Replace the placeholder thumbnail with: `<img src="assets/your-image.png" alt="Description" style="width:100%; height:100%; object-fit:cover;">`
4. Update the caption and `data-category` attribute (options: `screenshots`, `themes`, `fanart`)

### Change colors / branding
All color tokens are CSS variables defined at the top of `css/main.css`. Edit the `:root` block there.

### Add a new page
1. Copy any existing page HTML (e.g. `features.html`)
2. Update the `<title>` and `<meta name="description">`
3. Update the `page-hero-label` and hero headline
4. Add your new content sections
5. Add a link in the `<nav>` and `.nav-mobile` on every page, and in the footer

## Deploying to GitHub Pages

1. Push this folder to your GitHub repo (or push its contents to the repo root)
2. Go to repo Settings → Pages
3. Set Source to `Deploy from a branch`
4. Choose `main` branch, `/ (root)` folder
5. Save — your site will be live at `https://pixelatedprelude.github.io/XyvorraOS.com/`

For a custom domain (xyvorraos.com), add a `CNAME` file in the root containing just your domain name, then configure your DNS.

---

Built in the void. Shipped to the stars. ✦
