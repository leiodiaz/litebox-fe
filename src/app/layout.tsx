import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'LiteBox - Blog Platform',
  description: 'A modern blog platform for sharing articles and stories',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
