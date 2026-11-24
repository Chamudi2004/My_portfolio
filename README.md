# Chamudi Disanayaka — Portfolio

Personal portfolio website for **Chamudi Disanayaka**, a Computing & Information Systems undergraduate from Sri Lanka. The site presents my background, technical skills, projects, education, experience, achievements, certifications, and ways to get in touch.

## Features

- Responsive, animated portfolio experience
- Space-themed visual design with an interactive star background
- Sections for about, skills, projects, journey, achievements, certifications, and contact
- Portfolio content loaded from Supabase
- Project filtering and links to source code or live demos
- CV download support
- Contact form protected with Cloudflare Turnstile and submitted through a Supabase Edge Function

## Tech Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS
- Framer Motion
- Lucide React and React Icons
- Supabase
- Cloudflare Turnstile

## Getting Started

### Prerequisites

- Node.js 20 or newer
- npm
- A Supabase project configured with the portfolio data tables and Edge Function described below

### Installation

```bash
git clone https://github.com/Chamudi2004/My_portfolio.git
cd My_portfolio
npm install
```

Create a `.env.local` file in the project root:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
VITE_TURNSTILE_SITE_KEY=your-turnstile-site-key
```

Start the development server:

```bash
npm run dev
```

The application will be available at the local URL printed by Vite.

## Supabase Configuration

The application reads published records from these tables:

- `profiles`
- `education`
- `skills`
- `projects`
- `achievements`
- `certifications`
- `experience`

Each collection is filtered by `is_published` and ordered by `sort_order`. The contact form invokes a Supabase Edge Function named `submit-contact-message`, which is responsible for validating the Turnstile token and handling the message submission.

## Available Scripts

```bash
npm run dev       # Start the development server
npm run build     # Type-check and create a production build
npm run lint      # Run ESLint
npm run preview   # Preview the production build locally
```

## Project Structure

```text
src/
├── components/   # Shared navigation, footer, and background components
├── context/      # Portfolio data context
├── data/         # Static portfolio configuration
├── lib/          # Supabase client and data access
└── sections/     # Portfolio page sections
```

## Contact

- GitHub: [@Chamudi2004](https://github.com/Chamudi2004)
- LinkedIn: [Chamudi Disanayaka](https://www.linkedin.com/in/chamudi-disanayaka/)

## License

This project is maintained as a personal portfolio. Please contact me before reusing its content, branding, or design.
