import { getDictionary } from '@/lib/dictionary';
import { getSupabase } from '@/lib/supabase';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import Hero from '@/components/home/Hero';
import ServicesPreview from '@/components/home/ServicesPreview';
import HowItWorks from '@/components/home/HowItWorks';
import Testimonials from '@/components/home/Testimonials';
import CTABanner from '@/components/home/CTABanner';

export default async function HomePage({ params }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  
  let dbServices = [];
  let dbReviews = [];
  try {
    const supabase = getSupabase();
    if (supabase) {
      const [servicesRes, reviewsRes] = await Promise.all([
        supabase.from('services').select('*').order('sort_order', { ascending: true }).eq('is_active', true),
        supabase.from('reviews').select('*').order('created_at', { ascending: false }).eq('is_active', true)
      ]);
      if (servicesRes.data) dbServices = servicesRes.data;
      if (reviewsRes.data) dbReviews = reviewsRes.data;
    }
  } catch (e) {
    console.error('Failed to fetch data:', e);
  }

  return (
    <>
      <Navbar dict={dict} lang={lang} />
      <main>
        <Hero dict={dict} lang={lang} />
        <ServicesPreview dict={dict} lang={lang} dbServices={dbServices} />
        <HowItWorks dict={dict} lang={lang} />
        <Testimonials dict={dict} lang={lang} reviews={dbReviews} />
        <CTABanner dict={dict} lang={lang} />
      </main>
      <Footer dict={dict} lang={lang} />
      <WhatsAppButton dict={dict} />
    </>
  );
}
