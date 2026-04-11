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

const defaultReviews = [
  {
    content_en: "Mntgk transformed our restaurant's online presence. We went from invisible to getting new customers every day through Google. Highly recommended!",
    content_ar: "منتجك حوّل حضور مطعمنا على الإنترنت. انتقلنا من الظل إلى استقبال عملاء جدد كل يوم عبر قوقل. أنصح بهم بشدة!",
    client_name: "Ahmed Al-Rashid",
    client_role: "Restaurant Owner",
    rating: 5,
    is_active: true
  },
  {
    content_en: "I was worried about the cost and complexity, but Mntgk made everything simple. My salon website was ready in just 5 days!",
    content_ar: "كنت قلقة من التكلفة والتعقيد، لكن منتجك جعل كل شيء بسيطاً. موقع صالوني كان جاهزاً في 5 أيام فقط!",
    client_name: "Sara Mohammed",
    client_role: "Salon Owner",
    rating: 5,
    is_active: true
  },
  {
    content_en: "Professional, fast, and affordable. They didn't just build a website — they helped us build a real digital brand. Our sales increased by 40%!",
    content_ar: "احترافيون وسريعون وبأسعار مناسبة. لم يبنوا موقعاً فقط — ساعدونا في بناء علامة رقمية حقيقية. مبيعاتنا زادت 40%!",
    client_name: "Khalid Nasser",
    client_role: "Retail Store Owner",
    rating: 5,
    is_active: true
  }
];

async function seedReviews() {
  console.log(`Found ${defaultReviews.length} reviews to push to Supabase...`);

  // Clear existing to avoid duplicates
  const { error: delError } = await supabase.from('reviews').delete().neq('id', '00000000-0000-0000-0000-000000000000');
  if (delError) {
    console.error("Error clearing existing reviews:", delError);
  }

  const { data, error } = await supabase.from('reviews').insert(defaultReviews).select();
  
  if (error) {
    console.error("Failed to seed reviews:", error);
  } else {
    console.log(`Successfully seeded ${data.length} reviews!`);
  }
}

seedReviews();
