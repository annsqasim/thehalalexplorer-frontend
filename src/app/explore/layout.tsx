import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Explore | The Halal Explorer',
  robots: {
    index: false,
    follow: false,
  },
};

export default function ExploreLayout({ children }: { children: React.ReactNode }) {
  return children;
}
