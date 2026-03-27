# Antigravity Site Review Skill
Fetch a live website URL, analyze its HTML/CSS/JS across five audit pillars, and deliver:

1. An interactive HTML scorecard dashboard (rendered in chat)
2. A downloadable Markdown report with all findings and fixes


## Step 1: Fetch the Site
Use web_fetch on the provided URL. Capture the full HTML response including `<head>`, `<body>`, inline `<style>`, and any inline `<script>` blocks.
If the fetch fails or returns minimal content (e.g., a JS-only shell), note this to the user and work with whatever is available. Flag any sections that could not be audited due to client-side rendering.

## Step 2: Run the Five-Pillar Audit
Score each pillar from 0-20. Total possible score = 100.

### Pillar 1: Design & UX (20 pts max)
| Check | Points | What to Look For |
|---|---|---|
| Clear visual hierarchy | 3 | H1 > H2 > H3 used consistently; font sizes signal importance |
| Readable typography | 3 | Font size ≥ 16px body text; sufficient line-height; legible font choice |
| Color contrast | 3 | Text vs background contrast ratio meets WCAG AA (4.5:1 for body text) |
| Mobile responsiveness signals | 3 | Viewport meta present; responsive CSS (%, vw, media queries) used |
| Clear call-to-action | 2 | At least one prominent CTA button above the fold |
| Navigation usability | 2 | Nav links are descriptive (not "click here"); logical structure |
| Whitespace and layout balance | 2 | No content crowding; sections have clear breathing room |
| Branding consistency | 2 | Logo, color palette, and tone feel unified across sections |

**Fix format:** Describe the visual or structural change needed. Where CSS is the fix, provide the exact rule to add or modify.

### Pillar 2: Code Quality & Structure (20 pts max)
| Check | Points | What to Look For |
|---|---|---|
| Valid HTML structure | 4 | `<!DOCTYPE html>`, `<html>`, `<head>`, `<body>` all present and properly nested |
| Semantic HTML usage | 4 | Uses `<header>`, `<nav>`, `<main>`, `<section>`, `<footer>` instead of divs everywhere |
| No inline styles (or minimal) | 3 | Styles in `<style>` blocks or external CSS, not scattered `style=""` attributes |
| No dead code / placeholder content | 3 | No "Lorem ipsum", commented-out blocks left in, or unused elements |
| Script placement | 3 | Scripts use defer/async or are placed before `</body>` |
| Clean, readable structure | 3 | Indentation and nesting are consistent; no obviously broken or unclosed tags |

**Fix format:** Show the exact corrected markup or attribute to use.

### Pillar 3: Security (20 pts max)
| Check | Points | What to Look For |
|---|---|---|
| No sensitive data in source | 5 | No API keys, tokens, passwords, or credentials visible in HTML/JS |
| HTTPS enforced | 4 | All resource links (src, href) use https://, not http:// |
| External resources from trusted CDNs | 3 | Scripts/fonts loaded from reputable sources (Google, Cloudflare, jsDelivr, etc.) |
| Form security basics | 3 | Any forms use method="post", not method="get" for sensitive data |
| No obvious XSS vectors | 3 | No eval(), document.write(), or unsanitized innerHTML patterns in inline JS |
| Subresource integrity (SRI) | 2 | External scripts include integrity and crossorigin attributes |

**Fix format:** Flag the exact line or pattern and provide the corrected version. For security issues, mark severity clearly.

### Pillar 4: Performance & Speed (20 pts max)
| Check | Points | What to Look For |
|---|---|---|
| Lazy loading on images | 4 | `loading="lazy"` on below-fold `<img>` elements |
| Image format signals | 3 | Images reference modern formats (WebP, AVIF) or note if legacy formats used |
| Render-blocking resources | 4 | No synchronous `<script>` in `<head>` without defer/async |
| Minimal inline JavaScript | 3 | Large JS logic is external, not embedded in HTML |
| Font loading strategy | 3 | Google Fonts or custom fonts use display=swap or preconnect hints |
| Resource hints | 3 | `<link rel="preconnect">` or `<link rel="preload">` used for key assets |

*Note: Actual load times cannot be measured from HTML alone. Flag any checks that require live testing and recommend: Google PageSpeed Insights, WebPageTest, or Lighthouse.*
**Fix format:** Provide the exact attribute or tag change.

### Pillar 5: SEO / AEO (20 pts max)
| Check | Points | What to Look For |
|---|---|---|
| Title tag | 2 | Present, 50-60 chars, contains primary keyword |
| Meta description | 2 | Present, 120-158 chars, action-oriented |
| H1 tag | 2 | Exactly one `<h1>`, contains keyword, matches intent |
| Image alt text | 2 | All `<img>` have descriptive alt attributes |
| Open Graph tags | 2 | og:title, og:description, og:image, og:url present |
| Schema markup | 3 | JSON-LD block present and appropriate type used |
| Entity clarity | 2 | Business name, location, and service stated in plain text |
| Canonical tag | 2 | `<link rel="canonical">` present |
| Lang attribute | 1 | `<html lang="en">` present |

**Fix format:** Provide the exact HTML tag or JSON-LD block to add.
*Note: This pillar is a focused summary. If the user also wants a full deep-dive SEO/AEO audit, suggest running the seo-aeo-audit skill separately for extended coverage.*


## Step 3: Score and Grade
| Score | Grade | Label |
|---|---|---|
| 90-100 | A | Production-Ready |
| 75-89 | B | Strong, minor gaps |
| 55-74 | C | Needs Attention |
| 35-54 | D | Significant Issues |
| 0-34 | F | Requires Rework |

Compute overall score as the sum of all five pillar scores (max 100).

## Step 4: Deliver the HTML Dashboard
Build an interactive HTML artifact using this structure. The dashboard must:

- Display the site URL and audit date in the header
- Show an overall score (0-100) with a large gauge or progress ring
- Show five pillar cards with individual scores and color coding:
  - Green (#22c55e) for scores ≥ 16/20
  - Yellow (#f59e0b) for 10-15/20
  - Red (#ef4444) for < 10/20

List every finding under its pillar with:
- Severity badge: 🔴 Critical / 🟡 Important / 🔵 Enhancement
- "Why it matters" sentence (one line, plain language)
- The exact fix in a copy-pasteable code block

Include a "Top 5 Priority Fixes" section: highest-impact items ranked by effort vs. impact.
Include an Antigravity-specific callout box with tips relevant to Antigravity's builder constraints (see Antigravity Notes below).

**Color System**
- Background: #0f172a (dark navy) sidebar, #f8fafc (near-white) content area
- Accent: #6366f1 (indigo) for headers and highlights
- Pillar card borders match score color
- Gauge ring: red below 55, yellow 55-74, green 75+


## Step 5: Deliver the Downloadable Report
After the HTML dashboard, create a Markdown file using this structure:

```markdown
# Site Review Report
**URL:** [url]
**Date:** [date]
**Overall Score:** [score]/100 ([grade])

## Executive Summary
[2-3 sentence plain-language summary of the site's overall state]

## Pillar Scores
| Pillar | Score | Grade |
|---|---|---|
| Design & UX | x/20 | X |
...

## Findings by Pillar

### Pillar 1: Design & UX
[Findings with severity, explanation, and exact fix]

### Pillar 2: Code Quality & Structure
...

### Pillar 3: Security
...

### Pillar 4: Performance & Speed
...

### Pillar 5: SEO / AEO
...

## Top 5 Priority Fixes
1. [Issue] — [Why] — [Fix]
...

## Items Requiring Manual Verification
[List checks that could not be assessed from HTML alone, with tool recommendations]
```

Use present_files to share the file with the user.

## Antigravity-Specific Notes
Google Antigravity is a no-code website builder. When auditing Antigravity sites, keep these constraints in mind:

- **Schema and meta tags:** Antigravity may inject some meta tags automatically. Distinguish between what the builder adds vs. what can be user-customized. Flag gaps that require going into site settings vs. gaps that require custom code injection.
- **Inline styles:** Antigravity-generated code often uses heavy inline styles. Note this as a platform artifact, not just a code quality failure -- but still flag it if it creates contrast or override issues.
- **JavaScript:** Antigravity injects builder-specific JS. Do not flag platform JS as "suspicious" unless it contains obvious red flags (hardcoded keys, eval, etc.).
- **Image hosting:** Images are often hosted on Antigravity's CDN. Note whether lazy loading and alt text are present regardless of hosting.
- **Custom domain / HTTPS:** If the URL is a subdomain of an Antigravity domain, note that a custom domain and HTTPS enforcement may be a settings-level upgrade.
- **Limited HTML control:** Some fixes (e.g., adding defer to builder-injected scripts) may not be possible without platform-level changes. When a fix is outside user control, say so and suggest the closest available workaround or a support request to the platform.


## Behavior Notes
- Always fetch the URL before auditing. Never rely on memory or assumptions about a site's content.
- Audit all five pillars even if some are partially visible -- mark unverifiable checks clearly.
- Do not say "consider adding" -- give the exact code, copy, or CSS rule to use.
- If a pillar scores perfectly, acknowledge it positively before moving to issues.
- Keep language direct, practical, and actionable. The user wants a clear improvement path, not a lecture.
- After delivering both outputs, offer to generate a corrected `<head>` block incorporating all fixable SEO, performance, and security recommendations in one copy-paste block.
