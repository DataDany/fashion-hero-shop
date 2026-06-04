# Target Website

## URL
https://www.allbirds.com

## Scope

### Pages to Replicate
- [x] Home page
- [x] Product Listing Page (/collections/[slug])
- [x] Product Detail Page (/products/[slug])

### Fidelity Level
- [x] **High fidelity** — visually similar, same layout and feel, minor deviations OK

### In Scope
- Visual layout and styling (Allbirds design patterns)
- Component structure and interactions
- Responsive design (desktop, tablet, mobile)
- Generic placeholder data (no Allbirds IP)

### Out of Scope
- Real backend / database
- Authentication
- Real payments
- Allbirds branding, product names, or product images

## Why
Educational template for Wojtek's AI Product Heroes workshops. Students get a professional-looking ecommerce starting point to learn from and customize.

## Customization Plans
- Generic "FashionHero" branding instead of Allbirds
- Stock shoe images from Unsplash instead of Allbirds product photos
- Hardcoded product data that students can swap to a real API

## Custom Features Added

### Recently Viewed History Dropdown (navbar)
Added a clock icon button in the header (between search and wishlist) that opens a dropdown panel showing products the user has previously visited. Key details:
- Reads from `localStorage` key `stepforward-recently-viewed` — the same store the on-page recently-viewed carousel already writes to, so visiting a product page automatically populates the dropdown
- Shows up to 8 items: product thumbnail, name, and price in PLN
- Badge on the icon shows the current count of viewed items
- Click outside or navigate to a product to close the dropdown
- Files changed: `src/components/icons.tsx` (added `HistoryIcon`), `src/components/recently-viewed-dropdown.tsx` (new component), `src/components/header.tsx` (wired in)
