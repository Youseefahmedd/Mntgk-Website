import { getDictionary } from '@/lib/dictionary';
import { getSupabase } from '@/lib/supabase';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import PortfolioPageContent from '@/components/pages/PortfolioPageContent';

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  return {
    title: `${dict.nav.portfolio} — Hudoorak`,
    description: dict.portfolio.subtitle,
  };
}

export default async function PortfolioPage({ params }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  
  let projects = [];
  try {
    const supabase = getSupabase();
    if (supabase) {
      const { data } = await supabase.from('projects').select('*').order('created_at', { ascending: false });
      if (data) projects = data;
    }
  } catch (e) {
    console.error('Failed to fetch projects:', e);
  }

  return (
    <>
      <Navbar dict={dict} lang={lang} />
      <main>
        <PortfolioPageContent dict={dict} lang={lang} projects={projects} />
      </main>
      <Footer dict={dict} lang={lang} />
      <WhatsAppButton dict={dict} />
    </>
  );
}
