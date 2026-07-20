# Rahsaz Machine

A single-page website for **Rahsaz Machine**, a spare-parts store in Mashhad, Iran,
supplying genuine parts for Chinese wheel loaders (XCMG and Shantui brands). The site is
fully static (vanilla HTML/CSS/JS — no framework, no bundler) and its consultation form is
wired up to [Supabase](https://supabase.com).

🔗 Live demo: _(add your Cloudflare Pages / custom domain link here after deploying)_

---

## Features

- **Bilingual (Persian/English)** with a language-toggle button in the header and automatic
  page-direction switching (RTL/LTR)
- **Dark mode / light mode** toggle, with the user's preference remembered in the browser
- **Brand switcher panel** in the hero section — flips between XCMG and Shantui specs and
  logos
- **Scroll-scrubbed exploded-view canvas** — a wheel-loader exploded-view video, extracted
  into frames and drawn on a `<canvas>` that scrubs forward/backward as the user scrolls
- **Instagram-story-style product marquee** — floating, auto-scrolling category cards that
  open a full-screen story viewer with per-category videos (engine, chassis, electrical),
  complete with progress bars, keyboard/tap navigation, and swipe zones
- **Consultation form wired to Supabase** — customer requests are written straight to a
  Postgres table, no custom backend required
- **Looping background video** in the closing CTA section
- Varied scroll-in animations (fade / slide / scale) via `IntersectionObserver`
- Fully responsive layout (mobile / tablet / desktop)

## Tech stack

Plain HTML/CSS/JS — no React, no build step, no bundler. The only external dependency is
the Supabase JS SDK, loaded from a CDN (`@supabase/supabase-js`).

## Project structure

```
├── index.html              # all page markup
├── css/
│   └── style.css           # all styling (color/type tokens as CSS variables)
├── js/
│   └── app.js               # theme, language, brand panel, stories, Supabase form, canvas scrub
├── images/                  # logos and photos
├── media/
│   ├── cta-bg.mp4             # background video for the closing CTA section
│   ├── story-video.mp4        # warehouse walkthrough video (About section)
│   └── stories/                # per-category product videos (engine/chassis/electrical)
├── frames/                    # frames extracted from the exploded-view video (webp)
└── README.md
```

## Running locally

The site is fully static but must be served over HTTP — opening `index.html` directly
(`file://`) will break video, font, and map loading:

```bash
python -m http.server 8000
# or
npx serve .
```

Then open `http://localhost:8000`.

## Setting up the consultation form (Supabase)

The consultation form is wired to a Supabase project. To connect it to your own:

1. Create a free project at [supabase.com](https://supabase.com)
2. In the SQL Editor, create this table:
   ```sql
   create table consultation_requests (
     id uuid primary key default gen_random_uuid(),
     created_at timestamptz default now(),
     name text,
     phone text,
     brand text,
     message text,
     lang text
   );

   alter table consultation_requests enable row level security;

   create policy "Allow public insert"
   on consultation_requests
   for insert
   to anon
   with check (true);
   ```
3. From Settings → API, copy your **Project URL** and **Publishable (anon) key**
4. In `js/app.js`, replace the `SUPABASE_URL` and `SUPABASE_ANON_KEY` values with your own

## Deployment (Cloudflare Pages)

1. In [dash.cloudflare.com](https://dash.cloudflare.com), go to **Workers & Pages** →
   **Create application** → **Pages** tab → **Upload assets**
2. Drag and drop the *contents* of this repo (not the repo folder itself)
3. Click **Deploy** — you'll get a URL like `your-project.pages.dev`

Any other static host (Netlify, Vercel, GitHub Pages, etc.) works just as well with zero
changes, since there's no build step.

## Customizing content

- **Site copy**: all Persian/English text lives in `js/app.js`, in the `translations` object
- **Product story videos**: in `js/app.js`, the `storyCategories` array — change a video's
  path or add new items there
- **Font**: the site currently uses Vazirmatn (free); to switch to the licensed Kalameh
  font, drop the `.woff2` files into a `fonts/` folder — the `@font-face` block at the top
  of `css/style.css` is already wired up for it
- **Colors**: color tokens (`--ink`, `--yellow`, `--sand`, etc.) at the top of
  `css/style.css`

## License

Built for Rahsaz Machine. Free to use and adapt.
