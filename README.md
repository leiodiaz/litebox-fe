# LiteBox - Modern Blog Platform

A modern blog platform built with Next.js 16, TypeScript, and Tailwind CSS.

## Features

- 📝 **Article Listing**: Home page with 9 article cards per page
- 🔄 **Pagination**: "Load More" button to load additional articles
- ➕ **Create Posts**: Modal to create new posts with image upload and title
- 📄 **Article Detail**: Dedicated page for each article with Markdown content
- 🔗 **Related Posts**: Dynamic related posts section (3 most recent articles)
- 📱 **Responsive Design**: Fully responsive desktop and mobile layouts
- 🎨 **Static Components**: Filters, Newsletter subscription, and Most Viewed sections

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Markdown**: react-markdown with remark-gfm
- **Icons**: lucide-react

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/leiodiaz/litebox-fe.git
cd litebox-fe
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
```bash
cp .env.example .env.local
```

Edit `.env.local` and set your API URL:
```
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

4. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
litebox-fe/
├── src/
│   ├── app/              # Next.js app router pages
│   │   ├── article/[id]/ # Article detail page
│   │   ├── layout.tsx    # Root layout with header
│   │   ├── page.tsx      # Home page
│   │   └── globals.css   # Global styles
│   ├── components/       # React components
│   │   ├── ArticleCard.tsx
│   │   ├── Header.tsx
│   │   ├── NewPostModal.tsx
│   │   ├── RelatedPosts.tsx
│   │   ├── Filters.tsx
│   │   ├── Newsletter.tsx
│   │   └── MostViewed.tsx
│   ├── lib/              # Utility functions
│   │   └── api.ts        # API service
│   └── types/            # TypeScript types
│       └── article.ts
├── public/               # Static assets
└── package.json
```

## API Integration

The application expects a REST API with the following endpoints:

- `GET /api/posts?_page={page}&_limit={limit}` - List articles with pagination
- `GET /api/posts/{id}` - Get article by ID
- `POST /api/posts` - Create new article
- `GET /api/posts?_sort=createdAt&_order=desc&_limit={limit}` - Get recent articles

### Article Schema

```typescript
{
  id: number;
  title: string;
  imageUrl: string;
  userId: number;
  createdAt?: string;
  updatedAt?: string;
}
```

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Features Detail

### Home Page
- Displays 9 article cards in a responsive grid
- "Load More" button to fetch additional articles
- Sidebar with filters, newsletter, and most viewed sections

### New Post Modal
- Upload image for the post
- Enter post title
- Additional data (userId, etc.) is hardcoded as per requirements

### Article Detail Page
- Full article with header image
- Markdown content rendering
- Related posts section (3 most recent articles)
- Most viewed sidebar

### Static Components
- **Filters**: Category filters (visual only)
- **Newsletter**: Email subscription form (visual only)
- **Most Viewed**: List of popular articles (visual only)

## License

This project is private and not licensed for public use.
