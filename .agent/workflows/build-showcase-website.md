---
description: Build the Ironclad OS client showcase website from scratch
---

# Build Showcase Website Workflow

This workflow guides you through building a stunning client showcase website for Ironclad OS.

## Prerequisites

Before starting, ensure you understand:

1. Read `WEBSITE_PLAN.md` for the full implementation plan
2. Read `PRD.md` for product context
3. The existing components in `frontend/src/components/`

## Phase 1: Design System Setup

// turbo

1. Install required dependencies:

```bash
cd /Volumes/omarchyuser/projekti/nodaysidlecompiler/frontend && npm install framer-motion @heroicons/react react-syntax-highlighter @types/react-syntax-highlighter
```

1. Update `frontend/tailwind.config.js` with the industrial minimal color palette:
   - Primary Cyan: `#008db9`
   - Accent Yellow: `#ffdf32`
   - Dark: `#23282a`
   - Light Grey: `#e9e9e9`
   - Medium Grey: `#aaaaaa`

2. Create design system CSS in `frontend/src/styles/design-system.css`:
   - CSS custom properties
   - Animation keyframes
   - Typography settings

3. Import design system in `frontend/src/main.tsx`

## Phase 2: UI Components

Create these reusable components in `frontend/src/components/ui/`:

1. Create `Container.tsx` - centered content wrapper

2. Create `Section.tsx` - page section wrapper with padding

3. Create `Button.tsx` - styled button with variants (primary, secondary, ghost)

4. Create `Card.tsx` - flexible card component

5. Create `GridPattern.tsx` - SVG background pattern

6. Create `CodeBlock.tsx` - syntax-highlighted code display

7. Create `AnimatedCounter.tsx` - number animation component

8. Create `ScrollReveal.tsx` - scroll-triggered animation wrapper

## Phase 3: Navigation

1. Create `frontend/src/components/Navbar.tsx`:
    - Logo/brand
    - Navigation links
    - Mobile menu toggle
    - CTA button

2. Create `frontend/src/components/Footer.tsx`:
    - Navigation links
    - Social links
    - WASM badge

## Phase 4: Landing Page Sections

Create these in `frontend/src/components/sections/`:

1. Create `HeroSection.tsx`:
    - Bold headline with gradient text
    - Value proposition subheadline
    - CTA buttons
    - Animated background grid

2. Create `ProblemSection.tsx`:
    - "70% time spent on planning" stats
    - Pain point cards with icons
    - Animated counters

3. Create `HowItWorksSection.tsx`:
    - 3-step visual flow
    - Natural language → WASM → Artifacts
    - Animated connections

4. Create `DemoSection.tsx`:
    - Integrate existing DemoEngine
    - Add preset prompt buttons
    - Style to match design system

5. Create `OutputShowcaseSection.tsx`:
    - Tabbed interface
    - PRD / ARD / Task List / Agent Rules tabs
    - Animated tab transitions

6. Create `ComparisonSection.tsx`:
    - Day 1 vs Day 30 slider
    - Cost savings calculator
    - Interactive timeline

7. Create `ArchitectureSection.tsx`:
    - Tech stack diagram
    - React + Rust + WASM visualization
    - Copyable code snippets

8. Create `FeaturesSection.tsx`:
    - 6-column grid of feature cards
    - Icons and descriptions
    - Hover animations

9. Create `TrustSection.tsx`:
    - Tech stack logos
    - Performance metrics
    - Testimonial placeholders

10. Create `CTASection.tsx`:
    - Strong headline
    - Contact button/form
    - Background styling

## Phase 5: Page Assembly

1. Create `frontend/src/pages/Landing.tsx`:
    - Import all sections
    - Add Navbar and Footer
    - Scroll-triggered animations

2. Update `frontend/src/App.tsx`:
    - Set Landing as the home route
    - Keep existing routes

## Phase 6: Polish

1. Test responsive design:
    - Desktop (1280px+)
    - Tablet (768px - 1279px)
    - Mobile (optional but nice to have)

// turbo
28. Build and test:

```bash
cd /Volumes/omarchyuser/projekti/nodaysidlecompiler/frontend && npm run build
```

// turbo
29. Run dev server to review:

```bash
cd /Volumes/omarchyuser/projekti/nodaysidlecompiler/frontend && npm run dev
```

1. Review the website visually and make adjustments as needed

## Design Requirements Checklist

- [ ] Industrial minimal aesthetic (no gradients, clean lines)
- [ ] Color palette correctly applied
- [ ] Typography is modern and professional
- [ ] All sections have scroll animations
- [ ] Demo section is functional
- [ ] Responsive layout works
- [ ] Performance is optimized
- [ ] "Wow factor" achieved

## Notes

- The existing `DemoEngine.tsx` works with WASM - integrate it as-is
- If WASM fails to load, show a fallback UI (already implemented in DemoEngine)
- Use Framer Motion for all animations
- Use Heroicons for consistent iconography
- Generate any needed images using the generate_image tool
