import { createRequire } from 'module';
const require = createRequire(import.meta.url);

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase credentials in .env.local");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const defaultProjects = [
  {
    title_en: "Al Safwa Restaurant",
    title_ar: "مطعم الصفوة",
    description_en: "A modern restaurant website with online menu, reservation system, and Google Maps integration.",
    description_ar: "موقع مطعم عصري مع قائمة طعام إلكترونية ونظام حجز وتكامل مع خرائط قوقل.",
    category: "restaurant",
    image_url: null,
    is_featured: true
  },
  {
    title_en: "Glamour Beauty Salon",
    title_ar: "صالون جلامور للتجميل",
    description_en: "Elegant salon website showcasing services, gallery, and WhatsApp booking integration.",
    description_ar: "موقع صالون أنيق يعرض الخدمات والمعرض وتكامل الحجز عبر واتساب.",
    category: "salon",
    image_url: null,
    is_featured: true
  },
  {
    title_en: "Urban Style Store",
    title_ar: "متجر أوربان ستايل",
    description_en: "Retail store with product catalog, location map, and contact integration.",
    description_ar: "متجر تجزئة مع كتالوج منتجات وخريطة موقع وتكامل التواصل.",
    category: "retail",
    image_url: null,
    is_featured: true
  },
  {
    title_en: "ProFix Maintenance",
    title_ar: "بروفكس للصيانة",
    description_en: "Service provider website with booking system, service areas, and testimonials.",
    description_ar: "موقع مزود خدمات مع نظام حجز ومناطق خدمة وشهادات العملاء.",
    category: "services",
    image_url: null,
    is_featured: false
  },
  {
    title_en: "Bait Al-Chai Cafe",
    title_ar: "مقهى بيت الشاي",
    description_en: "Cozy cafe website with menu showcase, atmosphere gallery, and location pins.",
    description_ar: "موقع مقهى مريح مع عرض القائمة ومعرض الأجواء ومواقع الفروع.",
    category: "restaurant",
    image_url: null,
    is_featured: false
  },
  {
    title_en: "TechConnect Solutions",
    title_ar: "تك كونكت للحلول",
    description_en: "IT services company website with service breakdown, portfolio, and lead generation.",
    description_ar: "موقع شركة خدمات تقنية مع تفصيل الخدمات ومعرض الأعمال وتوليد العملاء.",
    category: "services",
    image_url: null,
    is_featured: false
  }
];

async function seedProjects() {
  console.log(`Found ${defaultProjects.length} projects to push to Supabase...`);

  // Clear existing to avoid duplicates if user already pushed some
  const { error: delError } = await supabase.from('projects').delete().neq('id', '00000000-0000-0000-0000-000000000000');
  if (delError) {
    console.error("Error clearing existing projects:", delError);
  }

  const { data, error } = await supabase.from('projects').insert(defaultProjects).select();
  
  if (error) {
    console.error("Failed to seed projects:", error);
  } else {
    console.log(`Successfully seeded ${data.length} projects!`);
  }
}

seedProjects();
