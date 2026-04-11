import { createRequire } from 'module';
const require = createRequire(import.meta.url);
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const enDict = require('../src/dictionaries/en.json');
const arDict = require('../src/dictionaries/ar.json');

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase credentials in .env.local");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function seedServices() {
  const services = enDict.services.items.map((serviceEn, i) => {
    const serviceAr = arDict.services.items[i];
    return {
      title_en: serviceEn.title,
      title_ar: serviceAr.title,
      description_en: serviceEn.description,
      description_ar: serviceAr.description,
      icon: serviceEn.icon,
      sort_order: i,
      is_active: true
    };
  });

  console.log(`Found ${services.length} services to push to Supabase...`);

  // Clear existing to avoid duplicates if user already pushed some
  const { error: delError } = await supabase.from('services').delete().neq('id', '00000000-0000-0000-0000-000000000000');
  if (delError) {
    console.error("Error clearing existing services:", delError);
  }

  const { data, error } = await supabase.from('services').insert(services).select();
  
  if (error) {
    console.error("Failed to seed services:", error);
  } else {
    console.log(`Successfully seeded ${data.length} services!`);
  }
}

seedServices();
