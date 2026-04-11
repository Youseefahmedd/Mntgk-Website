import { getDictionary } from '@/lib/dictionary';
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

  return (
    <>
      <Navbar dict={dict} lang={lang} />
      <main>
        <Hero dict={dict} lang={lang} />
        <ServicesPreview dict={dict} lang={lang} />
        <HowItWorks dict={dict} lang={lang} />
        <Testimonials dict={dict} lang={lang} />
        <CTABanner dict={dict} lang={lang} />
      </main>
      <Footer dict={dict} lang={lang} />
      <WhatsAppButton dict={dict} />
    </>
  );
}
