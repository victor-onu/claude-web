# TektonX Labs - Mentorship Platform

A modern web application for TektonX Labs, a non-profit organization dedicated to mentoring young Africans in technology.

## Features

### Landing Page
- Modern, minimalistic design with TektonX brand colors
- About section highlighting vision, mission, and values
- Programs overview
- Learning tracks display
- Contact form

### Mentorship Platform
- **User Authentication**: Sign up and login for mentors and mentees
- **Role-based Dashboards**:
  - **Mentee Dashboard**: Track progress, view assignments, submit work
  - **Mentor Dashboard**: View mentees, provide feedback, manage assignments
  - **Admin Dashboard**: Manage users, programs, and platform-wide settings

### Learning Tracks (7 Tracks)
1. Software Development (Frontend & Backend)
2. UI/UX Design
3. Mobile App Development
4. Product/Project Management
5. Quality Assurance (QA)
6. Data Analysis/Science
7. Cybersecurity

Each track includes:
- 3 milestones over 12 weeks
- Weekly tasks with resources
- Progress tracking
- Mentor feedback system

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Authentication**: NextAuth.js
- **Icons**: Lucide React

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd claude-web
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.local.example .env.local
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Demo Accounts

Use password: `demo123` for all demo accounts:

| Role | Email |
|------|-------|
| Admin | admin@tektonxlabs.org |
| Mentor | mentor.dev@tektonxlabs.org |
| Mentee | mentee1@example.com |

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── (auth)/            # Authentication pages
│   ├── (dashboard)/       # Dashboard pages
│   └── api/               # API routes
├── components/
│   ├── ui/                # Reusable UI components
│   ├── layout/            # Layout components
│   ├── landing/           # Landing page sections
│   ├── dashboard/         # Dashboard components
│   └── providers/         # Context providers
├── data/                  # Static data (tracks, etc.)
├── lib/                   # Utility functions
└── types/                 # TypeScript types
```

## Brand Colors

| Color | Hex | Usage |
|-------|-----|-------|
| Deep Purple | #670EB3 | Primary brand color |
| Electric Purple | #A41AFF | Accents, gradients |
| Light Green | #BFEE7F | Success states |
| Teal | #59D6E6 | Secondary accents |
| Yellow | #FFD761 | Warnings, highlights |
| Deep Blue | #002BA1 | Alternative accent |

## Deployment

The application can be deployed to:
- Vercel (recommended)
- Netlify
- Any Node.js hosting platform

## Adding Your Logo

Replace the placeholder logo files in `public/images/`:
- `logo.png` - Main logo for light backgrounds
- `logo-white.png` - White version for dark backgrounds

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is for TektonX Labs - a non-profit organization.

---

**TektonX Labs** - Building People. Building Products. Building Africa.
