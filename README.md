# Portfolio

A personal portfolio website built with Next.js 16 App Router, TypeScript, and Sanity CMS. Designed to be fully dynamic, bilingual, and highly performant.

[Live Demo](https://hasbihasbullh.my.id)

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat-square&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-black?style=flat-square&logo=framer&logoColor=blue)
![Sanity](https://img.shields.io/badge/Sanity-F03E2F?style=flat-square&logo=sanity&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat-square&logo=vercel&logoColor=white)

<!-- Insert your project screenshot here:
![Screenshot](./public/screenshot.png)
-->

## Architecture & Tech Stack

### Frontend Core
- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS, Radix UI Primitives (for accessible interactive components)
- **Animations:** Framer Motion (page transitions and micro-interactions)
- **Internationalization:** `next-intl` (English & Indonesian routing without flicker)

### Backend & Integrations
- **Headless CMS:** Sanity Studio v3 (Embedded directly into `/studio`)
- **Email Service:** Resend API (routed securely via Next.js backend API at `/api/contact`)
- **Data Integrations:** WakaTime API, MonkeyType API, GitHub API (routed via `/api/activity`)
- **Analytics:** Vercel Analytics, Vercel Speed Insights

## Key Features

### Bilingual Support (i18n)
Full content translation between English (en) and Indonesian (id). Routing is handled automatically (e.g. `/en/about` and `/id/about`).

### Fully Dynamic Content Management
100% of the portfolio data is managed dynamically via Sanity CMS. The schemas include:
- **Profile:** Bio, social links, resume, and gallery images.
- **Projects:** Rich project data, tech stacks, links, and dynamic category filtering.
- **Experience & Education:** Detailed timelines with dynamic logos.
- **Achievements:** Certificate credentials, issuing dates, and badge types.
- **Skills:** Tech skills categorized efficiently.

### Real-Time API Integrations
- **GitHub API:** Renders a live contribution graph.
- **WakaTime API:** Displays real-time coding statistics and top programming languages.
- **MonkeyType API:** Showcases live typing speed metrics.
*(Note: API keys are securely hidden behind Next.js server-side route handlers to prevent exposure).*

### Built for Performance & SEO
- **Server-Side Rendering (SSR) & Static Generation:** Maximizing load speeds.
- **Dynamic SEO:** Fully automated `sitemap.ts`, `robots.ts`, and Open Graph metadata generation.
- **Custom Error Pages:** Beautifully designed custom 404 (`not-found.tsx`) and Error (`error.tsx`) states.

## Prerequisites

Ensure you have the following installed before proceeding:
- [Node.js](https://nodejs.org/) (v18.17.0 or higher)
- [Git](https://git-scm.com/)
- A [Sanity.io](https://www.sanity.io/) account
- A [Resend](https://resend.com/) account (for the contact form)

## Local Setup Instructions

Follow these steps to run the project locally.

### 1. Clone the repository

```bash
git clone https://github.com/hasbihasbullh/portfolio.git
cd portfolio
```

### 2. Install dependencies

Using npm:
```bash
npm install
```

### 3. Environment Variables

Create a new `.env.local` file by copying the provided example template:
```bash
cp .env.example .env.local
```

Open `.env.local` and populate the keys. Here is how to obtain them:

- **Sanity CMS (`NEXT_PUBLIC_SANITY_PROJECT_ID`):**
  1. Go to [Sanity Manage](https://www.sanity.io/manage).
  2. Select your project and copy the **Project ID**.

- **Resend Email API (`RESEND_API_KEY`):**
  1. Go to [Resend](https://resend.com/) and create an account.
  2. Navigate to **API Keys** and generate a new key.
  3. (Optional) Verify your domain in the **Domains** section to send emails from a custom address.
  4. Set `CONTACT_RECEIVER_EMAIL` to the email address where you want to receive messages from visitors.

- **GitHub Integration (`GITHUB_USERNAME`):**
  1. Simply input your public GitHub username (e.g., `hasbihasbullh`). No secret token is required for the public graph.

- **WakaTime API (`WAKATIME_API_KEY`):**
  1. Log in to [WakaTime](https://wakatime.com/).
  2. Go to **Settings** -> **Account**.
  3. Copy your **Secret API Key**.

- **MonkeyType Integration (`MONKEYTYPE_USERNAME`):**
  1. Simply input your public MonkeyType username.

### 4. Run the Development Server

Start the Next.js development server:
```bash
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

## Content Management (Sanity Studio)

This project utilizes Sanity CMS. The dashboard is embedded directly into the Next.js application, meaning you don't need a separate repository to manage content.

1. Ensure the development server is running (`npm run dev`).
2. Navigate to [http://localhost:3000/studio](http://localhost:3000/studio).
3. Log in with your Sanity credentials.
4. You can now create, edit, or delete content. Any changes published here will immediately trigger a UI update on the frontend.

## Folder Structure Overview

- `/app` - Next.js App Router including:
  - `/[locale]` - Pages grouped by language (Home, About, Projects, Activity, Contact).
  - `/api` - Server-side API endpoints for third-party integrations to hide secret keys.
  - `/studio` - The embedded Sanity CMS dashboard.
- `/common` - Reusable UI components, layout elements, and configuration constants.
- `/modules` - Feature-specific components grouped by page domain (e.g., `projects`, `activity`).
- `/sanity` - Sanity CMS configurations, schema definitions, and GROQ queries.

## Deployment

This project is optimized for deployment on Vercel.

1. Push your local repository to GitHub.
2. Log in to [Vercel](https://vercel.com/) and create a new project.
3. Import your GitHub repository.
4. Add all the environment variables from your `.env.local` file into the Vercel project settings.
5. Click **Deploy**.

## License

This project is licensed under the [MIT License](LICENSE).
