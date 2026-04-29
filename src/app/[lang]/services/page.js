import { getDictionary } from '@/lib/dictionary';
import { getSupabase } from '@/lib/supabase';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import ServicesPageContent from '@/components/pages/ServicesPageContent';

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  return {
    title: `${dict.nav.services} — ${lang === 'ar' ? 'حضورك' : 'Hudoorak'}`,
    description: dict.services.subtitle,
  };
}

export default async function ServicesPage({ params }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  
  let dbServices = [];
  try {
    const supabase = getSupabase();
    if (supabase) {
      const { data } = await supabase.from('services').select('*').order('sort_order', { ascending: true }).eq('is_active', true);
      if (data) dbServices = data;
    }
  } catch (e) {
    console.error('Failed to fetch services:', e);
  }

  return (
    <>
      <Navbar dict={dict} lang={lang} />
      <main>
        <ServicesPageContent dict={dict} lang={lang} dbServices={dbServices} />
      </main>
      <Footer dict={dict} lang={lang} />
      <WhatsAppButton dict={dict} />
    </>
  );
}
