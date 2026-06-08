import { Metadata } from 'next';

type Props = { params: { slug: string }; children: React.ReactNode };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.vibeinvite.ro';
  
  // Legătura cu fișierul tău route.tsx
  const ogImageUrl = `${baseUrl}/api/og/romantic/${params.slug}`;
  const pageUrl = `${baseUrl}/invitatie/romantic/${params.slug}`;
  
  const title = 'Vă invităm la nunta noastră! ♥';
  const description = 'Suntem bucuroși să vă invităm alături de noi în cea mai specială zi.';

  return {
    title: title,
    description: description,
    
    // 1. Asta acoperă: Facebook, WhatsApp, Messenger, Instagram, TikTok, Discord, iMessage, etc.
    openGraph: {
      title: title,
      description: description,
      url: pageUrl,
      type: 'website',
      images: [
        { 
          url: ogImageUrl, 
          width: 1200, 
          height: 630,
          alt: 'Invitație Nuntă',
        }
      ],
    },
    
    // 2. Asta acoperă specific X (Twitter) și face pozele mari și pe Telegram
    twitter: {
      card: 'summary_large_image',
      title: title,
      description: description,
      images: [ogImageUrl],
    },
  };
}

export default function Layout({ children }: Props) {
  return <>{children}</>;
}