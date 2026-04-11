import { getDictionary } from '@/lib/dictionary';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import PortfolioPageContent from '@/components/pages/PortfolioPageContent';

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  return {
    title: `${dict.nav.portfolio} — Mntgk`,
    description: dict.portfolio.subtitle,
  };
}

export default async function PortfolioPage({ params }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <>
      <Navbar dict={dict} lang={lang} />
      <main>
        <PortfolioPageContent dict={dict} lang={lang} />
      </main>
      <Footer dict={dict} lang={lang} />
      <WhatsAppButton dict={dict} />
    </>
  );
}
