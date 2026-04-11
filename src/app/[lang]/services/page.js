import { getDictionary } from '@/lib/dictionary';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import ServicesPageContent from '@/components/pages/ServicesPageContent';

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  return {
    title: `${dict.nav.services} — Mntgk`,
    description: dict.services.subtitle,
  };
}

export default async function ServicesPage({ params }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <>
      <Navbar dict={dict} lang={lang} />
      <main>
        <ServicesPageContent dict={dict} lang={lang} />
      </main>
      <Footer dict={dict} lang={lang} />
      <WhatsAppButton dict={dict} />
    </>
  );
}
