// app/layout.tsx
import '@/css/global.css';

export const metadata = {
  title: 'My Blog',
  description: 'Welcome to my blog!',
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
