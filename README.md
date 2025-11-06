# LiteBox - Blog Platform

A modern blog platform built with Next.js, TypeScript, and Tailwind CSS.

## Features

- 📝 **Article Listing**: Paginated display of blog posts (9 per page)
- ➕ **Create Posts**: Modal interface to create new blog posts
- 📖 **Article Details**: Full article view with markdown rendering
- 🔗 **Related Posts**: Shows 3 latest posts on detail pages
- 📱 **Responsive Design**: Mobile-friendly interface
- ✨ **Smooth Transitions**: Hover effects and animations

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Markdown**: react-markdown with remark-gfm

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/leiodiaz/litebox-fe.git
cd litebox-fe
```

2. Install dependencies
```bash
npm install
```

3. Run the development server
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
src/
├── app/
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Home page with pagination
│   └── post/[id]/page.tsx   # Article detail page
├── components/
│   ├── ArticleCard.tsx      # Article card component
│   ├── Header.tsx           # Header with New Post button
│   └── NewPostModal.tsx     # Modal for creating posts
├── lib/
│   ├── api.ts               # API service layer
│   └── content.ts           # Static markdown content
└── types/
    └── index.ts             # TypeScript type definitions
```

## Usage

### Creating a New Post

1. Click the "New Post" button in the header
2. Enter a title and image URL
3. Click "Create Post"
4. The new post will appear at the top of the list

### Viewing Article Details

Click on any article card to view the full article with:
- Complete markdown content
- Author information
- Related posts
- Social sharing options

### Loading More Posts

Click the "Load More" button at the bottom of the home page to load the next 9 posts.

## License

ISC
