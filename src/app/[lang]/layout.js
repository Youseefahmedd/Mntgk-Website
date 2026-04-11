import '../globals.css';
import { getDictionary } from '@/lib/dictionary';

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'ar' }];
}

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  return {
    title: dict.meta.title,
    description: dict.meta.description,
    icons: { icon: '/favicon.ico' },
    openGraph: {
      title: dict.meta.title,
      description: dict.meta.description,
      locale: lang === 'ar' ? 'ar_SA' : 'en_US',
      type: 'website',
    },
  };
}

export default async function RootLayout({ children, params }) {
  const { lang } = await params;
  const dir = lang === 'ar' ? 'rtl' : 'ltr';

  return (
    <html lang={lang} dir={dir}>
      <body>
        {children}
      </body>
    </html>
  );
}
