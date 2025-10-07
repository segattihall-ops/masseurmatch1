# MasseurMatch

## Overview

MasseurMatch is a Next.js-based web application designed to connect professional massage therapists with clients. The application features a visually striking landing page with 3D graphics, particle effects, and smooth animations to create an immersive user experience. Built with TypeScript and modern React patterns, it serves as a platform for discovering elite massage professionals powered by AI technology.

**Last Updated:** October 7, 2025  
**Status:** Premium landing page complete - Production-ready ($10k tier design)

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

**Styling Strategy: Tailwind CSS**
- **Problem**: Need for rapid UI development with consistent design system
- **Solution**: Tailwind CSS with custom theme extensions
- **Custom Design Tokens**:
  - Colors: `accent` (#B393D3), `gold` (#F5C16C), `dark` (#0C0C0C)
  - Custom font family: Rowland
  - Extended box shadows for glow effects
- **Rationale**: Utility-first CSS enables fast prototyping while maintaining design consistency

### 3D Graphics & Animation Layer

**Three.js Integration via React Three Fiber**
- **Problem**: Need for sophisticated 3D visual effects without heavy performance overhead
- **Solution**: React Three Fiber (@react-three/fiber) with Drei helpers (@react-three/drei)
- **Components**:
  - `HologramOrb`: Distorted sphere with metallic material and auto-rotation
  - `ParticleField`: 300-particle system with slow rotation animation
- **Rationale**: Declarative 3D rendering in React keeps code maintainable while leveraging WebGL performance

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

**Color Palette**
- Primary: Purple/Fuchsia gradient (#B393D3 accent)
- Secondary: Amber/Gold (#F5C16C)
- Background: Deep black with radial gradient

**Animation Patterns**
- Continuous glow pulse on heading (3s cycle)
- Particle rotation (0.0005 rad/frame)
- Orb auto-rotation (0.8 speed)
- Text shadow morphing between purple and gold

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