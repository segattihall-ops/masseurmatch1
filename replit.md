# MasseurMatch

## Overview

MasseurMatch is a Next.js-based web application designed to connect professional massage therapists with clients. The application features a minimalist Grok X.AI-inspired monochromatic landing page with 3D graphics and smooth animations. Built with TypeScript and modern React patterns using only blacks, grays, and whites - no colorful elements. The design emphasizes depth through lighting, texture, and motion rather than color.

**Last Updated:** October 7, 2025  
**Status:** Grok X.AI-inspired monochromatic design with interactive chatbox - Production-ready

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework Choice: Next.js 15 with TypeScript**
- **Problem**: Need for a modern, performant web application with server-side rendering capabilities and TypeScript support for type safety
- **Solution**: Next.js 15 with TypeScript provides built-in SSR, API routes, and excellent developer experience
- **Rationale**: Next.js offers file-based routing, automatic code splitting, and optimized production builds while TypeScript ensures code quality and better IDE support

**Pages Directory Structure**
- Uses the traditional `pages/` directory pattern (not App Router)
- API routes located in `pages/api/` for backend functionality
- Component organization in dedicated `components/` folder

**Styling Strategy: Tailwind CSS with Grok Monochrome Palette**
- **Problem**: Need for Grok X.AI-inspired minimalist monochromatic design
- **Solution**: Tailwind CSS with custom Grok color tokens (blacks, grays, whites only)
- **Grok Color Palette**:
  - `grok-black` (#050505) - Deepest background
  - `grok-darkest` (#0A0A0B) - Dark elements
  - `grok-dark` (#111118) - Card backgrounds
  - `grok-card` (#16161D) - Interactive cards
  - `grok-gray` (#1A1A22) - Secondary backgrounds
  - `grok-border` (#2E2E3B) - Borders and dividers
  - `grok-muted` (#5B5F72) - Muted accents
  - `grok-text` (#8A8FA3) - Secondary text
  - `grok-light` (#E6E8EE) - Light text
  - `grok-white` (#F7F7FA) - Primary text and highlights
- **No Colorful Elements**: All emojis replaced with monochrome symbols (•, ●, ○, ★, ✓)
- **Rationale**: Strict monochromatic design achieves visual hierarchy through typography, spacing, and motion instead of color

### 3D Graphics & Animation Layer

**Three.js Integration via React Three Fiber**
- **Problem**: Need for sophisticated 3D visual effects in strict monochrome
- **Solution**: React Three Fiber (@react-three/fiber) with Drei helpers (@react-three/drei)
- **Components**:
  - Metallic charcoal orb (#2E2E3B) with high metalness (0.95)
  - Distorted sphere with grayscale filter (filter: grayscale(100%))
  - Reduced opacity (20%) for subtle background presence
- **Rationale**: 3D elements add depth without breaking monochromatic constraint through grayscale filtering

**Animation Framework: Framer Motion**
- **Problem**: Need for smooth, physics-based animations for UI elements
- **Solution**: Framer Motion for declarative animation API
- **Implementation**: Header text with fade-in, text shadow pulse, and gradient animations
- **Rationale**: Framer Motion provides production-ready animations with minimal code

### Development Configuration

**TypeScript Configuration**
- Target: ES2017 for broad browser compatibility
- Module resolution: Bundler mode for Next.js optimization
- Strict mode disabled for flexibility during development

**ESLint Setup**
- Extends Next.js core web vitals configuration
- Ensures code quality and catches common React/Next.js issues

**Build & Development Scripts**
- Development server on port 5000 with host binding for Replit compatibility
- Production build with standard Next.js optimization
- Production server on port 3000

### Visual Design System

**Monochromatic Design System**
- Background: Pure black (#050505) - no gradients
- Text Hierarchy: White (#F7F7FA) → Light (#E6E8EE) → Gray (#8A8FA3) → Muted (#5B5F72)
- Interactive Elements: White on dark, with subtle gray borders
- No color accents - depth achieved through shadows, borders, and opacity

**Animation Patterns** 
- Typewriter text animation (40ms per character)
- Card entrance stagger (50ms delay per card)
- Hover lift animations (scale + translate)
- Smooth fade transitions (300-800ms)
- Pulse animations on status indicators

## External Dependencies

### Core Framework Dependencies
- **Next.js 15.2.3**: React framework for production with SSR and API routes
- **React 19.0.0 & React DOM 19.0.0**: Latest React library for UI components

### 3D Graphics Stack
- **three 0.180.0**: WebGL 3D library for rendering graphics
- **@react-three/fiber 9.3.0**: React renderer for Three.js
- **@react-three/drei 10.7.6**: Useful helpers and abstractions for React Three Fiber (OrbitControls, Sphere, MeshDistortMaterial)

### Animation & Styling
- **framer-motion 12.23.22**: Production-ready motion library for React
- **tailwindcss 3.4.18**: Utility-first CSS framework with custom configuration
- **autoprefixer 10.4.21**: PostCSS plugin for vendor prefixes
- **postcss 8.5.6**: CSS transformation toolkit

### Development Tools
- **TypeScript 5.8.2**: Static type checking
- **ESLint 9.23.0**: Code linting with Next.js config
- **@types packages**: Type definitions for Node.js, React, and React DOM

### Infrastructure Considerations
- **Replit Integration**: Custom Next.js config for allowed dev origins using `REPLIT_DOMAINS` environment variable
- **No Database**: Currently no database integration; application is frontend-focused
- **No External APIs**: No third-party service integrations beyond npm packages
- **No Authentication**: No auth system implemented

### Future Integration Points
- Database layer could be added (Drizzle ORM is commonly used with Next.js)
- API routes exist as placeholder (`/api/hello`) for backend expansion
- Authentication system would integrate with existing API route structure
- External APIs for masseur/client matching functionality not yet implemented