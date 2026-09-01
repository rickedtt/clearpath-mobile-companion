# ClearPath Mobile Companion

Project 4 in the ClearPath Business Systems portfolio: a polished, interactive concept for the optional Android and iOS companion experience used by owners and field employees.

The mobile companion is **not required** to use ClearPath. The core PC business system remains the primary, complete product; this demo explores fast field access for the moments when a user is away from the desk.

## Run locally

Requirements: Node.js 22.13 or newer and npm.

```bash
npm install
npm run dev
```

Open the local address printed in the terminal (normally `http://localhost:3000`).

Quality checks:

```bash
npm run test
npm run lint
npm run build
```

## Demo walkthrough

1. Start in **Employee** mode and clock out to reveal the owner-approved jobsite check.
2. Enter the demo PIN `4826` or choose simulated location verification, then clock in.
3. Switch to **Owner** mode to review team visibility.
2. Review the three assigned jobs, then open any job for its schedule, address, instructions, and field-notes placeholder.
3. Use **Start job** and **Mark complete** to advance the selected job locally.
4. Try the Today, Jobs, and Me bottom-navigation destinations.
5. Switch to **Owner** mode with the control above the phone preview.
6. Review the daily summary, unassigned-job alert, live team status, recent activity, and Today’s jobs tab.
7. Resize below 900 px to see the concept become a full-screen, phone-first app surface.

## Product and visual approach

- Employee information is intentionally glanceable: shift status, route order, service context, and direct job actions.
- Owner information prioritizes exceptions and operational awareness over a dense administrative dashboard.
- The wide-screen portfolio frame explains the relationship to ClearPath; on phone-sized screens, the app takes over the viewport.
- Controls use native buttons, explicit labels, visible keyboard focus, semantic tabs and navigation, reduced-motion support, and responsive touch targets.

## Demo boundaries

This repository is a frontend-only portfolio artifact. All names, companies, addresses, times, jobs, activity, and alerts are synthetic demonstration data.

- No external APIs, authentication, database, analytics, or background synchronization
- No real messages, phone calls, directions, payments, or customer records
- No durable persistence; interactions reset after refresh, and notes remain only in component state
- No offline queue, conflict handling, real GPS geofencing, secure PIN administration, permissions, push notifications, or production security model
- No deployment configuration is exercised as part of this deliverable

## Future Android and iOS packaging

The responsive React surface is suitable for a later native-shell proof of concept. A future phase could package the production web build with Capacitor, then add platform-specific app icons, splash screens, safe-area QA, deep links, biometric session unlock, secure credential storage, push notifications, offline job caching, and store signing/review workflows.

Before real mobile release, the jobsite gate would need server-side owner/manager PIN or address configuration, secure GPS geofencing with privacy controls, and audit logging. The companion would also need authenticated integration with the core PC system, authorization by role, audit logging, encrypted transport and local storage, accessibility testing on physical devices, privacy disclosures, telemetry policy, and Android/iOS release automation. None of those capabilities are implied by this visual demo.

## Technology

- React 19 with Vinext/Vite
- TypeScript
- Lucide icon components
- Vitest, Testing Library, and jsdom
- ESLint
