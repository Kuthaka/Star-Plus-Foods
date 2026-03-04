
import { createClient } from './src/lib/supabase/client';

const supabase = createClient();

async function check() {
    const { data, error } = await supabase.from('products').select('name, slug');
    console.log("Existing Slugs:", data);
    if (error) console.error(error);
}

check();
